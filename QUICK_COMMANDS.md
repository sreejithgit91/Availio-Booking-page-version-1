# 🚀 Quick Command Reference

## Essential Commands (Copy & Paste These!)

### Start Your Development Server
```bash
npm run dev
```
**Opens your app at:** http://localhost:5173

### Stop Your App
**Press:** `Ctrl + C` (in terminal)

### Install New Packages
```bash
npm install package-name
```

### Add shadcn/ui Components
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
```

### Navigate Folders in Terminal
```bash
cd Desktop                  # Go to Desktop
cd booking-app             # Enter your project
cd ..                      # Go back one folder
```

### Check What's Installed
```bash
node --version             # Check Node.js version
npm --version              # Check npm version
npm list                   # See installed packages
```

## 🆘 Emergency Commands

### Fix Broken Packages
```bash
npm cache clean --force
npm install
```

### Use Different Port (if 5173 is busy)
```bash
npm run dev -- --port 3000
```

### Reset Everything (Nuclear Option)
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## 📁 Important Files to Know

- **`src/App.jsx`** - Your main app file (edit this!)
- **`src/index.css`** - Global styles
- **`package.json`** - Lists all your dependencies
- **`tailwind.config.js`** - Tailwind CSS settings

## 🎨 Common Tailwind Classes

```css
/* Layout */
flex items-center justify-center
min-h-screen
p-4 p-8 p-12

/* Colors */
bg-blue-500 bg-gray-100 bg-white
text-blue-600 text-gray-800 text-white

/* Spacing */
mb-4 mt-4 ml-4 mr-4
space-y-4 space-x-4

/* Borders & Shadows */
rounded-lg rounded-xl
shadow-lg shadow-xl
border border-gray-200
```

## 🧩 Quick Component Usage

```jsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click Me!</Button>
      </CardContent>
    </Card>
  )
}
```

**Keep this handy while you code!** 🎯