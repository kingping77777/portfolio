import subprocess
import os

def run_cmd(args, env=None):
    result = subprocess.run(args, capture_output=True, text=True, env=env, encoding='utf-8', errors='ignore')
    return result.returncode, result.stdout, result.stderr

def main():
    print("Checking Git history for future-dated commits (2027) and December commits...")
    
    code, out, err = run_cmd(['git', 'log', '--format=%H|%aI|%cI'])
    if code != 0:
        print("Error: Could not read Git log. Make sure you are in a git repository.")
        print(err)
        return

    commits_to_fix = []
    for line in out.strip().split('\n'):
        if not line:
            continue
        parts = line.split('|')
        if len(parts) == 3:
            commit_hash, ad, cd = parts
            # Identify if it needs year adjustment
            if '2027' in ad or '2027' in cd or ('2026-12' in ad) or ('2026-12' in cd):
                commits_to_fix.append((commit_hash, ad, cd))

    if not commits_to_fix:
        print("✨ No commits needing year adjustments found. Your history is clean!")
        return

    print(f"Found {len(commits_to_fix)} commits to adjust:")
    for h, ad, cd in commits_to_fix[:5]:
        print(f"  - Commit {h[:8]}: Author Date = {ad}, Committer Date = {cd}")
    if len(commits_to_fix) > 5:
        print(f"  ... and {len(commits_to_fix) - 5} more.")

    # Check for uncommitted changes
    status_code, status_out, _ = run_cmd(['git', 'status', '--porcelain'])
    if status_out.strip():
        print("\n⚠️ WARNING: You have unstaged or uncommitted changes in your repository.")
        print("Please stash or commit your changes before running this script.")
        print("You can stash changes by running: git stash")
        return

    print("\nThis adjustment will:")
    print("  1. Change 2027 commits to 2026 (keeping the original month, day, and time).")
    print("  2. Change December 2026 commits to December 2025 (keeping the day and time).")
    
    confirm = input("\nDo you want to run this adjustment? (y/n): ")
    if confirm.lower() != 'y':
        print("Aborted.")
        return

    # Dynamic date filter script
    filter_command = (
        '# Adjust Author Date\n'
        'if echo "$GIT_AUTHOR_DATE" | grep -q "2027"; then\n'
        '  export GIT_AUTHOR_DATE=$(echo "$GIT_AUTHOR_DATE" | sed "s/2027/2026/g")\n'
        'elif echo "$GIT_AUTHOR_DATE" | grep -q "2026-12"; then\n'
        '  export GIT_AUTHOR_DATE=$(echo "$GIT_AUTHOR_DATE" | sed "s/2026-12/2025-12/g")\n'
        'fi\n'
        '# Adjust Committer Date\n'
        'if echo "$GIT_COMMITTER_DATE" | grep -q "2027"; then\n'
        '  export GIT_COMMITTER_DATE=$(echo "$GIT_COMMITTER_DATE" | sed "s/2027/2026/g")\n'
        'elif echo "$GIT_COMMITTER_DATE" | grep -q "2026-12"; then\n'
        '  export GIT_COMMITTER_DATE=$(echo "$GIT_COMMITTER_DATE" | sed "s/2026-12/2025-12/g")\n'
        'fi'
    )

    print("\nRunning git filter-branch (this may take a few seconds)...")
    
    code, out, err = run_cmd([
        'git', 'filter-branch', '-f', 
        '--env-filter', filter_command, 
        '--tag-name-filter', 'cat', 
        '--', '--all'
    ])

    if code == 0:
        print("\n🎉 Success! Commit years adjusted successfully while keeping original days, months, and times.")
        print("Verify your updated history by running: git log")
        print("\nNote: Since history was rewritten, force push the branch to update GitHub:")
        print("  git push origin main --force")
    else:
        print("\n❌ Failed to rewrite commit dates:")
        print(err)

if __name__ == '__main__':
    main()
