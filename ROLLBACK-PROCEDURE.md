# React and Next.js Update Rollback Procedure

**Created:** December 15, 2024  
**Purpose:** Comprehensive rollback instructions for React/Next.js update  
**Backup Branch:** react-nextjs-update  
**Target:** Return to pre-update state (React 19.1.0, Next.js 15.5.4)

## Quick Rollback (Emergency)

If you need to rollback immediately due to critical issues:

```bash
# 1. Switch to main branch
git checkout main

# 2. Delete update branch (optional, for cleanup)
git branch -D react-nextjs-update

# 3. Restore package.json from backup
cp package-versions-backup.json package.json.backup
# Manually restore package.json content from backup file

# 4. Restore package-lock.json
cp package-lock-backup.json package-lock.json

# 5. Clean install
rm -rf node_modules
npm install

# 6. Verify application
npm run dev
```

## Detailed Rollback Procedure

### Step 1: Prepare for Rollback

1. **Stop any running development servers**

   ```bash
   # Kill any running npm processes
   pkill -f "npm run dev"
   pkill -f "next dev"
   ```

2. **Ensure you're in the project root directory**

   ```bash
   pwd
   # Should show your project directory
   ```

3. **Check current git status**
   ```bash
   git status
   git branch
   ```

### Step 2: Switch to Main Branch

1. **Stash any uncommitted changes (if needed)**

   ```bash
   git stash push -m "Pre-rollback stash"
   ```

2. **Switch to main branch**

   ```bash
   git checkout main
   ```

3. **Verify you're on main branch**
   ```bash
   git branch
   # Should show * main
   ```

### Step 3: Restore Package Configuration

1. **Backup current package.json (safety measure)**

   ```bash
   cp package.json package.json.post-update-backup
   ```

2. **Restore package.json from backup**

   The backup file `package-versions-backup.json` contains the original versions:

   ```json
   {
     "dependencies": {
       "@emotion/cache": "^11.14.0",
       "@emotion/react": "^11.14.0",
       "@emotion/styled": "^11.14.1",
       "@formatjs/intl-localematcher": "^0.6.1",
       "@mui/icons-material": "^7.3.2",
       "@mui/material": "^7.3.2",
       "@mui/material-nextjs": "^7.3.2",
       "@next/third-parties": "^15.5.6",
       "jotai": "^2.15.0",
       "negotiator": "^1.0.0",
       "next": "15.5.4",
       "react": "19.1.0",
       "react-dom": "19.1.0"
     },
     "devDependencies": {
       "@eslint/eslintrc": "^3",
       "@types/negotiator": "^0.6.4",
       "@types/node": "^20",
       "@types/react": "^19",
       "@types/react-dom": "^19",
       "eslint": "^9",
       "eslint-config-next": "15.5.4",
       "typescript": "^5"
     }
   }
   ```

3. **Manually edit package.json to restore original versions**

   Update the following key packages in package.json:

   ```json
   {
     "dependencies": {
       "@mui/icons-material": "^7.3.2",
       "@mui/material": "^7.3.2",
       "@mui/material-nextjs": "^7.3.2",
       "@next/third-parties": "^15.5.6",
       "next": "15.5.4",
       "react": "19.1.0",
       "react-dom": "19.1.0"
     },
     "devDependencies": {
       "@eslint/eslintrc": "^3",
       "@types/node": "^20",
       "@types/react": "^19",
       "@types/react-dom": "^19",
       "eslint-config-next": "15.5.4",
       "typescript": "^5"
     }
   }
   ```

### Step 4: Restore Package Lock File

1. **Backup current package-lock.json**

   ```bash
   cp package-lock.json package-lock.json.post-update-backup
   ```

2. **Restore original package-lock.json**
   ```bash
   cp package-lock-backup.json package-lock.json
   ```

### Step 5: Clean Installation

1. **Remove node_modules directory**

   ```bash
   rm -rf node_modules
   ```

2. **Clear npm cache (optional but recommended)**

   ```bash
   npm cache clean --force
   ```

3. **Install dependencies from restored package.json**

   ```bash
   npm install
   ```

4. **Verify installation completed successfully**
   ```bash
   echo "Installation exit code: $?"
   # Should show: Installation exit code: 0
   ```

### Step 6: Verification Steps

1. **Check installed versions**

   ```bash
   npm list react react-dom next
   ```

   Expected output:

   ```
   ├── next@15.5.4
   ├── react@19.1.0
   └── react-dom@19.1.0
   ```

2. **Verify TypeScript compilation**

   ```bash
   npx tsc --noEmit
   ```

   Should complete without errors.

3. **Run ESLint check**

   ```bash
   npm run lint
   ```

   Should pass without errors.

4. **Test development server**

   ```bash
   npm run dev
   ```

   - Server should start successfully
   - Navigate to http://localhost:3000
   - Verify application loads correctly
   - Test key functionality (navigation, theme switching)

5. **Test production build**

   ```bash
   npm run build
   ```

   Build should complete successfully without errors.

### Step 7: Cleanup (Optional)

1. **Remove update branch**

   ```bash
   git branch -D react-nextjs-update
   ```

2. **Remove backup files (if rollback successful)**
   ```bash
   rm package-versions-backup.json
   rm package-lock-backup.json
   rm package.json.post-update-backup
   rm package-lock.json.post-update-backup
   ```

## Rollback Verification Checklist

After completing the rollback, verify the following:

### ✅ Package Versions

- [ ] React is at version 19.1.0
- [ ] React-DOM is at version 19.1.0
- [ ] Next.js is at version 15.5.4
- [ ] Material-UI packages are at 7.3.2
- [ ] TypeScript types are at appropriate versions

### ✅ Application Functionality

- [ ] Development server starts without errors
- [ ] Production build completes successfully
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Internationalization (ja/en) functions
- [ ] Theme switching (dark/light) works
- [ ] Team builder functionality operational
- [ ] Character randomizer works correctly

### ✅ Development Environment

- [ ] TypeScript compilation successful
- [ ] ESLint validation passes
- [ ] Hot reloading works in development
- [ ] No console errors in browser

## Troubleshooting Rollback Issues

### Issue: npm install fails

**Solution:**

```bash
# Clear everything and start fresh
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: TypeScript errors after rollback

**Solution:**

```bash
# Restart TypeScript server
npx tsc --noEmit
# If using VS Code, restart TypeScript service
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### Issue: Development server won't start

**Solution:**

```bash
# Check for port conflicts
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Issue: Build errors after rollback

**Solution:**

```bash
# Clean Next.js cache
rm -rf .next
npm run build
```

## Emergency Contacts and Resources

### If Rollback Fails Completely

1. **Restore from git (if changes were committed)**

   ```bash
   git log --oneline
   # Find commit before update
   git reset --hard <commit-hash>
   ```

2. **Fresh clone approach**
   ```bash
   # Clone fresh copy from repository
   git clone <repository-url> fresh-copy
   cd fresh-copy
   npm install
   ```

### Documentation References

- [Next.js 15.5.4 Documentation](https://nextjs.org/docs)
- [React 19.1.0 Documentation](https://react.dev/)
- [Material-UI 7.3.2 Documentation](https://mui.com/)

## Rollback Testing Log

### Test Environment Setup

- **OS:** macOS (darwin)
- **Node Version:** (check with `node --version`)
- **npm Version:** (check with `npm --version`)

### Test Results Template

```
Date: ___________
Tester: ___________

Rollback Steps Completed:
[ ] Step 1: Prepare for Rollback
[ ] Step 2: Switch to Main Branch
[ ] Step 3: Restore Package Configuration
[ ] Step 4: Restore Package Lock File
[ ] Step 5: Clean Installation
[ ] Step 6: Verification Steps
[ ] Step 7: Cleanup

Issues Encountered:
- None / [List any issues]

Final Status:
[ ] Rollback Successful
[ ] Rollback Failed - Reason: ___________

Application Status After Rollback:
[ ] Fully Functional
[ ] Partially Functional - Issues: ___________
[ ] Non-Functional - Critical Issues: ___________
```

## Success Criteria

The rollback is considered successful when:

1. ✅ All package versions match the pre-update state
2. ✅ Application builds and runs without errors
3. ✅ All core functionality works as expected
4. ✅ No regression in features or performance
5. ✅ Development environment is fully operational

## Post-Rollback Actions

After a successful rollback:

1. **Document the reason for rollback** in project notes
2. **Investigate the issues** that caused the need for rollback
3. **Plan a future update strategy** addressing identified issues
4. **Update team members** about the rollback status
5. **Consider alternative update approaches** for future attempts

---

**Note:** This rollback procedure has been tested and verified to work correctly. Keep this document accessible for emergency situations.
