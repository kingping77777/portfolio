<script>
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/environment'
	import * as THREE from 'three'

	export let effect = 'water'

	let canvas
	let renderer
	let scene
	let camera
	let animationId
	let startTime = Date.now()
	let observer

	let bubbles = []
	let fishes = []
	let galaxyPoints = null
	let causticsMesh
	let backgroundMesh

	// Mouse coordinates for interactive bubble displacement
	let mouse = new THREE.Vector2(-9999, -9999)
	let targetMouse = new THREE.Vector2(-9999, -9999)

	// Shaders for Three.js Background & Caustics
	const bgVertexShader = `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
	`

	const bgFragmentShader = `
		uniform vec3 u_colorTop;
		uniform vec3 u_colorBottom;
		uniform float u_time;
		varying vec2 vUv;

		void main() {
			// Slow wave distortion on the gradient
			float wave = sin(vUv.x * 4.0 + u_time * 0.2) * 0.04;
			float factor = clamp(vUv.y + wave, 0.0, 1.0);
			vec3 color = mix(u_colorBottom, u_colorTop, factor);
			gl_FragColor = vec4(color, 1.0);
		}
	`

	const causticsVertexShader = `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
	`

	const causticsFragmentShader = `
		uniform float u_time;
		uniform vec2 u_resolution;
		uniform vec3 u_color;
		varying vec2 vUv;

		void main() {
			vec2 p = vUv * 4.0 - vec2(2.0);
			p.x *= u_resolution.x / u_resolution.y;

			float t = u_time * 0.35;

			for (int i = 1; i < 4; i++) {
				float f = float(i);
				p.x += sin(p.y + t + f * 1.5) * 0.25;
				p.y += cos(p.x + t + f * 1.3) * 0.25;
			}

			float caustic = 1.0 / length(p - vec2(sin(p.y), cos(p.x)));
			caustic = clamp(pow(caustic, 2.0) * 0.1, 0.0, 1.0);

			gl_FragColor = vec4(u_color, caustic * 0.45);
		}
	`

	// Create a programmatic 3D fish mesh
	function createFishMesh() {
		const fishGroup = new THREE.Group()

		// Shiny pearlescent fish material
		const fishMaterial = new THREE.MeshPhysicalMaterial({
			color: 0x3b82f6,
			roughness: 0.15,
			metalness: 0.1,
			clearcoat: 1.0,
			clearcoatRoughness: 0.1,
			transmission: 0.2, // slightly translucent fins
			thickness: 0.1
		})

		// Body: stretched sphere
		const bodyGeom = new THREE.SphereGeometry(0.24, 16, 16)
		bodyGeom.scale(2.2, 1.0, 0.5) // long, tall, thin
		const body = new THREE.Mesh(bodyGeom, fishMaterial)
		fishGroup.add(body)

		// Tail: small cone
		const tailGeom = new THREE.ConeGeometry(0.12, 0.4, 4)
		tailGeom.rotateX(Math.PI / 2)
		tailGeom.scale(1.0, 0.15, 2.5) // flat vertically
		const tail = new THREE.Mesh(tailGeom, fishMaterial)
		tail.position.x = -0.7
		fishGroup.add(tail)

		// Fin: top dorsal fin
		const finGeom = new THREE.ConeGeometry(0.08, 0.35, 3)
		finGeom.rotateZ(-Math.PI / 3)
		finGeom.scale(1.5, 1.0, 0.2)
		const fin = new THREE.Mesh(finGeom, fishMaterial)
		fin.position.set(-0.1, 0.22, 0)
		fishGroup.add(fin)

		// Left & Right pectoral fins
		const pecGeom = new THREE.ConeGeometry(0.06, 0.25, 3)
		pecGeom.rotateX(Math.PI / 4)
		pecGeom.scale(1.5, 0.2, 1.0)
		const leftPec = new THREE.Mesh(pecGeom, fishMaterial)
		leftPec.position.set(0.1, -0.1, 0.15)
		fishGroup.add(leftPec)

		const rightPec = leftPec.clone()
		rightPec.position.z = -0.15
		rightPec.rotateX(-Math.PI / 2)
		fishGroup.add(rightPec)

		return {
			group: fishGroup,
			tail,
			leftPec,
			rightPec,
			material: fishMaterial
		}
	}

	function resetBubble(mesh) {
		const scale = 0.06 + Math.random() * 0.18
		mesh.scale.set(scale, scale, scale)
		mesh.position.x = (Math.random() * 2 - 1) * 7.5
		mesh.position.y = -5.5
		mesh.position.z = (Math.random() * 2 - 1) * 4 - 1
	}

	function updateThemeColors() {
		if (!backgroundMesh || !causticsMesh) return

		const isDark = document.documentElement.getAttribute('data-theme') === 'dark'

		if (effect === 'water') {
			if (isDark) {
				backgroundMesh.material.uniforms.u_colorTop.value.setHex(0x031220)
				backgroundMesh.material.uniforms.u_colorBottom.value.setHex(0x01050a)
				causticsMesh.material.uniforms.u_color.value.setHex(0x14b8a6) // glowing cyan/teal
			} else {
				backgroundMesh.material.uniforms.u_colorTop.value.setHex(0xe0f2fe) // sky-blue
				backgroundMesh.material.uniforms.u_colorBottom.value.setHex(0xd1fae5) // light mint
				causticsMesh.material.uniforms.u_color.value.setHex(0x38bdf8) // light blue
			}
		} else {
			// Space Mode Gradient Colors
			if (isDark) {
				backgroundMesh.material.uniforms.u_colorTop.value.setHex(0x130725) // deep violet
				backgroundMesh.material.uniforms.u_colorBottom.value.setHex(0x010006) // void black
			} else {
				backgroundMesh.material.uniforms.u_colorTop.value.setHex(0xf3e8ff) // soft lavender
				backgroundMesh.material.uniforms.u_colorBottom.value.setHex(0xe0f2fe) // soft sky blue
			}
		}
	}

	function switchEffectMode(mode) {
		if (!scene) return

		// Clear previous elements
		bubbles.forEach((b) => {
			scene.remove(b.mesh)
			b.mesh.geometry.dispose()
			b.mesh.material.dispose()
		})
		bubbles = []

		fishes.forEach((f) => {
			scene.remove(f.meshGroup)
			f.meshGroup.children.forEach((child) => {
				child.geometry.dispose()
				child.material.dispose()
			})
		})
		fishes = []

		if (galaxyPoints) {
			scene.remove(galaxyPoints)
			galaxyPoints.geometry.dispose()
			galaxyPoints.material.dispose()
			galaxyPoints = null
		}

		// Mode logic
		if (mode === 'water') {
			document.documentElement.classList.add('water-immersed')
			if (causticsMesh) causticsMesh.visible = true

			// Create Bubbles
			const bubbleCount = 45
			const bubbleGeometry = new THREE.SphereGeometry(1, 16, 16)
			for (let i = 0; i < bubbleCount; i++) {
				const bubbleMaterial = new THREE.MeshPhysicalMaterial({
					color: 0xffffff,
					transmission: 0.9,
					opacity: 1.0,
					transparent: true,
					roughness: 0.02,
					ior: 1.15,
					thickness: 0.15,
					specularIntensity: 0.9,
					clearcoat: 1.0,
					clearcoatRoughness: 0.01
				})
				const mesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial)
				resetBubble(mesh)
				mesh.position.y = (Math.random() * 2 - 1) * 5
				scene.add(mesh)
				bubbles.push({
					mesh,
					speed: 0.012 + Math.random() * 0.018,
					swaySpeed: 0.6 + Math.random() * 1.4,
					swayAmount: 0.04 + Math.random() * 0.08,
					swayOffset: Math.random() * Math.PI * 2,
					baseX: mesh.position.x
				})
			}

			// Create 3D Swimming Fishes
			const fishCount = 6
			for (let i = 0; i < fishCount; i++) {
				const fish = createFishMesh()
				const hue = 0.52 + Math.random() * 0.15 // cyan/blue/indigo spectrum
				const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
				fish.material.color.setHSL(hue, 0.85, isDark ? 0.45 : 0.6)

				// Staggered positioning
				fish.group.position.x = (Math.random() * 2 - 1) * 8
				fish.group.position.y = (Math.random() * 2 - 1) * 3.5
				fish.group.position.z = (Math.random() * 2 - 1) * 2 - 1.5

				const dir = Math.random() < 0.5 ? 1 : -1
				const swimSpeed = 0.012 + Math.random() * 0.02
				const tailSpeed = 8 + Math.random() * 6

				scene.add(fish.group)
				fishes.push({
					meshGroup: fish.group,
					tail: fish.tail,
					leftPec: fish.leftPec,
					rightPec: fish.rightPec,
					dir,
					speed: swimSpeed,
					tailSpeed,
					tailPhase: Math.random() * Math.PI * 2
				})
			}
		} else {
			// Space Mode: Disable layout waves
			document.documentElement.classList.remove('water-immersed')
			if (causticsMesh) causticsMesh.visible = false

			// Create 3D Rotating Spiral Galaxy
			const starCount = 3500
			const positions = new Float32Array(starCount * 3)
			const colors = new Float32Array(starCount * 3)
			
			const arms = 3
			const radius = 9
			const spin = 1.3

			for (let i = 0; i < starCount; i++) {
				const r = Math.random() * radius
				const angle = ((i % arms) * 2 * Math.PI) / arms + r * spin

				const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r
				const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2 * r
				const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r

				positions[i * 3] = Math.cos(angle) * r + randomX
				positions[i * 3 + 1] = randomY
				positions[i * 3 + 2] = Math.sin(angle) * r + randomZ

				// Spiral color mixing (bright white core, purple arms, pink/emerald outer)
				const mixedColor = new THREE.Color()
				const coreColor = new THREE.Color(0xffffff)
				
				const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
				const armColor = isDark ? new THREE.Color(0x8b5cf6) : new THREE.Color(0x3b82f6)
				const outerColor = isDark ? new THREE.Color(0xec4899) : new THREE.Color(0x10b981)

				if (r < 2.5) {
					mixedColor.lerpColors(coreColor, armColor, r / 2.5)
				} else {
					mixedColor.lerpColors(armColor, outerColor, (r - 2.5) / (radius - 2.5))
				}

				colors[i * 3] = mixedColor.r
				colors[i * 3 + 1] = mixedColor.g
				colors[i * 3 + 2] = mixedColor.b
			}

			const starGeometry = new THREE.BufferGeometry()
			starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
			starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

			const starMaterial = new THREE.PointsMaterial({
				size: 0.08,
				sizeAttenuation: true,
				vertexColors: true,
				transparent: true,
				opacity: 0.85,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			})

			galaxyPoints = new THREE.Points(starGeometry, starMaterial)
			galaxyPoints.rotation.x = 0.35 // tilt angle
			scene.add(galaxyPoints)
		}

		updateThemeColors()
	}

	function handleResize() {
		if (!renderer || !camera || !canvas) return
		const width = window.innerWidth
		const height = window.innerHeight
		
		renderer.setSize(width, height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		camera.aspect = width / height
		camera.updateProjectionMatrix()
	}

	function handleMouseMove(e) {
		targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1
		targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1
	}

	onMount(() => {
		if (!browser) return

		// 1. Scene setup
		scene = new THREE.Scene()
		
		camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
		camera.position.z = 5

		renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true
		})
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		// 2. Lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.55)
		scene.add(ambientLight)

		const dirLight = new THREE.DirectionalLight(0xffffff, 1.25)
		dirLight.position.set(5, 10, 7)
		scene.add(dirLight)

		// 3. BG Gradient
		const bgGeometry = new THREE.PlaneGeometry(2, 2)
		const bgMaterial = new THREE.ShaderMaterial({
			vertexShader: bgVertexShader,
			fragmentShader: bgFragmentShader,
			uniforms: {
				u_colorTop: { value: new THREE.Color() },
				u_colorBottom: { value: new THREE.Color() },
				u_time: { value: 0 }
			},
			depthWrite: false
		})
		backgroundMesh = new THREE.Mesh(bgGeometry, bgMaterial)
		scene.add(backgroundMesh)

		// 4. Caustics Plane
		const causticsGeometry = new THREE.PlaneGeometry(2, 2)
		const causticsMaterial = new THREE.ShaderMaterial({
			vertexShader: causticsVertexShader,
			fragmentShader: causticsFragmentShader,
			uniforms: {
				u_time: { value: 0 },
				u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
				u_color: { value: new THREE.Color() }
			},
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		})
		causticsMesh = new THREE.Mesh(causticsGeometry, causticsMaterial)
		scene.add(causticsMesh)

		// Initialize current background effect mode
		switchEffectMode(effect)

		// Setup Mutation Observer for Theme Toggles
		observer = new MutationObserver(() => {
			updateThemeColors()
		})
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		})

		window.addEventListener('resize', handleResize)
		window.addEventListener('mousemove', handleMouseMove)

		// 5. Render Loop
		const filter = document.querySelector('#water-displacement-filter feTurbulence')
		let filterTime = 0

		const animate = () => {
			const currentTime = (Date.now() - startTime) * 0.001

			// Update Shaders Time Uniform
			if (backgroundMesh) {
				backgroundMesh.material.uniforms.u_time.value = currentTime
			}
			if (causticsMesh && causticsMesh.visible) {
				causticsMesh.material.uniforms.u_time.value = currentTime
				causticsMesh.material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
			}

			// Mouse Coordinate Smoothing
			mouse.x += (targetMouse.x - mouse.x) * 0.08
			mouse.y += (targetMouse.y - mouse.y) * 0.08

			// Animation: Water Mode
			if (effect === 'water') {
				// Animate Bubbles
				bubbles.forEach((b) => {
					b.mesh.position.y += b.speed
					const sway = Math.sin(currentTime * b.swaySpeed + b.swayOffset) * b.swayAmount
					b.mesh.position.x = b.baseX + sway

					if (mouse.x > -9000) {
						const cursor3D = new THREE.Vector3(mouse.x, mouse.y, 0.5)
						cursor3D.unproject(camera)
						const dir = cursor3D.sub(camera.position).normalize()
						const distanceToPlane = (b.mesh.position.z - camera.position.z) / dir.z
						const posAtDepth = camera.position.clone().add(dir.multiplyScalar(distanceToPlane))

						const dx = b.mesh.position.x - posAtDepth.x
						const dy = b.mesh.position.y - posAtDepth.y
						const dist = Math.sqrt(dx * dx + dy * dy)

						if (dist < 1.8) {
							const force = (1.8 - dist) * 0.12
							b.baseX += (dx / dist) * force
							b.mesh.position.y += (dy / dist) * force
						}
					}

					if (b.mesh.position.y > 5.5) {
						resetBubble(b.mesh)
						b.baseX = b.mesh.position.x
					}
				})

				// Animate Swimming Fishes
				fishes.forEach((f) => {
					f.meshGroup.position.x += f.dir * f.speed

					if (f.dir > 0) {
						f.meshGroup.rotation.y = 0
					} else {
						f.meshGroup.rotation.y = Math.PI
					}

					// Sway tail and fins
					f.tail.rotation.y = Math.sin(currentTime * f.tailSpeed + f.tailPhase) * 0.35
					f.leftPec.rotation.z = Math.sin(currentTime * f.tailSpeed * 0.8 + f.tailPhase) * 0.15
					f.rightPec.rotation.z = -Math.sin(currentTime * f.tailSpeed * 0.8 + f.tailPhase) * 0.15

					// Roll and float elevation sway
					f.meshGroup.position.y += Math.sin(currentTime * (f.tailSpeed * 0.25) + f.tailPhase) * 0.003

					if (f.dir > 0 && f.meshGroup.position.x > 9.5) {
						f.meshGroup.position.x = -9.5
						f.meshGroup.position.y = (Math.random() * 2 - 1) * 3.5
					} else if (f.dir < 0 && f.meshGroup.position.x < -9.5) {
						f.meshGroup.position.x = 9.5
						f.meshGroup.position.y = (Math.random() * 2 - 1) * 3.5
					}
				})

				// Animate SVG ripples
				if (filter) {
					filterTime += 0.007
					const fx = 0.0035 + Math.sin(filterTime) * 0.0006
					const fy = 0.0055 + Math.cos(filterTime * 0.8) * 0.0006
					filter.setAttribute('baseFrequency', `${fx} ${fy}`)
				}
			} else {
				// Animation: Space Mode (Starfield Galaxy Rotation)
				if (galaxyPoints) {
					galaxyPoints.rotation.y = currentTime * 0.03
					// Slow galaxy camera drift/wobble
					galaxyPoints.rotation.z = Math.sin(currentTime * 0.08) * 0.05
				}
			}

			renderer.render(scene, camera)
			animationId = requestAnimationFrame(animate)
		}

		animate()
	})

	// Reactive check to switch between water and space modes
	$: if (browser && scene) {
		switchEffectMode(effect)
	}

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', handleResize)
			window.removeEventListener('mousemove', handleMouseMove)
			document.documentElement.classList.remove('water-immersed')
			if (animationId) cancelAnimationFrame(animationId)
			if (observer) observer.disconnect()

			// Dispose meshes
			bubbles.forEach((b) => {
				b.mesh.geometry.dispose()
				b.mesh.material.dispose()
			})
			fishes.forEach((f) => {
				f.meshGroup.children.forEach((child) => {
					child.geometry.dispose()
					child.material.dispose()
				})
			})

			if (backgroundMesh) {
				backgroundMesh.geometry.dispose()
				backgroundMesh.material.dispose()
			}

			if (causticsMesh) {
				causticsMesh.geometry.dispose()
				causticsMesh.material.dispose()
			}

			if (galaxyPoints) {
				galaxyPoints.geometry.dispose()
				galaxyPoints.material.dispose()
			}

			if (renderer) renderer.dispose()
		}
	})
</script>

<canvas bind:this={canvas} class="water-canvas"></canvas>

<!-- SVG water ripple displacement filter for DOM waves -->
<svg class="water-svg-filter" xmlns="http://www.w3.org/2000/svg" width="0" height="0">
	<defs>
		<filter id="water-displacement-filter">
			<feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="1" result="wave" />
			<feDisplacementMap in="SourceGraphic" in2="wave" scale="12" xChannelSelector="R" yChannelSelector="G" />
		</filter>
	</defs>
</svg>

<style lang="scss">
	.water-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -10;
		pointer-events: none;
		opacity: 0.9;
	}

	.water-svg-filter {
		pointer-events: none;
		visibility: hidden;
		position: absolute;
		width: 0;
		height: 0;
	}

	:global(.water-immersed) {
		filter: url(#water-displacement-filter);
	}
</style>
