# 🚀 React.js Booking App Development Setup Guide

**For Complete Beginners** - Follow these steps exactly and you'll have a professional React.js development environment ready for your booking app prototype!

## 📋 What We'll Install Today
- **Node.js & npm** - JavaScript runtime and package manager
- **React app with Vite** - Lightning-fast development setup
- **Tailwind CSS** - Modern styling framework
- **shadcn/ui** - Beautiful, ready-to-use components

---

## 🟢 Step 1: Install Node.js and npm

### For Windows Users:

1. **Download Node.js:**
   - Open your web browser
   - Go to: **https://nodejs.org**
   - Click the **LTS** button (it's green and says something like "20.x.x LTS")
   - Your download will start automatically (file name: `node-v20.x.x-x64.msi`)

2. **Install Node.js:**
   - Find the downloaded file (usually in your Downloads folder)
   - **Double-click** the file to start installation
   - Click **"Next"** on the welcome screen
   - Click **"I accept"** for the license agreement
   - Click **"Next"** (keep default installation location)
   - Click **"Next"** (keep all default features selected)
   - Click **"Install"** 
   - Enter your admin password if Windows asks
   - Click **"Finish"** when installation completes

3. **Verify Installation:**
   - Press **Windows key + R**
   - Type **`cmd`** and press **Enter**
   - In the black window that opens, type: **`node --version`** and press Enter
   - You should see something like: `v20.9.0`
   - Type: **`npm --version`** and press Enter
   - You should see something like: `10.1.0`

### For Mac Users:

1. **Download Node.js:**
   - Open your web browser
   - Go to: **https://nodejs.org**
   - Click the **LTS** button
   - Download will start (file name: `node-v20.x.x.pkg`)

2. **Install Node.js:**
   - Find the downloaded `.pkg` file
   - **Double-click** to open
   - Click **"Continue"** through the installer
   - Click **"Install"**
   - Enter your Mac password when prompted
   - Click **"Close"** when finished

3. **Verify Installation:**
   - Press **Cmd + Space**
   - Type **"Terminal"** and press **Enter**
   - Type: **`node --version`** and press Enter
   - Type: **`npm --version`** and press Enter

✅ **Success Checkpoint:** You should see version numbers for both commands!

---

## 🟢 Step 2: Create Your React App with Vite

1. **Open Your Terminal/Command Prompt:**
   - **Windows:** Press `Windows + R`, type `cmd`, press Enter
   - **Mac:** Press `Cmd + Space`, type "Terminal", press Enter

2. **Navigate to Your Desktop (or wherever you want your project):**
   ```bash
   cd Desktop
   ```

3. **Create Your React App:**
   ```bash
   npm create vite@latest booking-app -- --template react
   ```
   - **Important:** Type this exactly as shown
   - Press **Enter** when it asks to confirm
   - Wait for it to finish (takes about 30 seconds)

4. **Enter Your New Project Folder:**
   ```bash
   cd booking-app
   ```

5. **Install All Dependencies:**
   ```bash
   npm install
   ```
   - This takes 2-3 minutes
   - You'll see lots of text scrolling - this is normal!

✅ **Success Checkpoint:** You should see "added XXX packages" when it finishes!

---

## 🟢 Step 3: Run Your App Locally

1. **Start Your Development Server:**
   ```bash
   npm run dev
   ```

2. **Open Your App in Browser:**
   - Look for a line that says: `Local: http://localhost:5173/`
   - **Hold Ctrl** (or Cmd on Mac) and **click the link**, OR
   - Open your browser manually and type: `http://localhost:5173`

3. **🎉 Celebrate!** 
   - You should see a React app with a spinning Vite logo
   - The page says "Vite + React" at the top

**To stop your app:** Go back to your terminal and press **Ctrl + C**

---

## 🟢 Step 4: Install Tailwind CSS

1. **Stop your app first** (Ctrl + C in terminal)

2. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Create Tailwind Configuration Files:**
   ```bash
   npx tailwindcss init -p
   ```

4. **Configure Tailwind (I'll show you exactly what to do):**
   
   **Open your project in a text editor:**
   - **Windows:** Right-click on the `booking-app` folder → "Open with" → Choose any text editor
   - **Mac:** Drag the `booking-app` folder to your text editor
   - **Recommended editors:** VS Code, Sublime Text, or even Notepad

5. **Edit the `tailwind.config.js` file:**
   - Find and open `tailwind.config.js`
   - Replace ALL content with this:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

6. **Edit the `src/index.css` file:**
   - Find and open `src/index.css`
   - Replace ALL content with this:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

✅ **Success Checkpoint:** Files are saved and ready!

---

## 🟢 Step 5: Install shadcn/ui Components

1. **Install shadcn/ui:**
   ```bash
   npx shadcn-ui@latest init
   ```

2. **Answer the setup questions** (choose these exact options):
   - `Would you like to use TypeScript?` → Type **`n`** and press Enter
   - `Which style would you like to use?` → Press Enter (selects "Default")
   - `Which color would you like to use as base color?` → Press Enter (selects "Slate")
   - `Where is your global CSS file?` → Type **`src/index.css`** and press Enter
   - `Would you like to use CSS variables for colors?` → Type **`y`** and press Enter
   - `Where is your tailwind.config.js located?` → Press Enter (uses default)
   - `Configure the import alias for components?` → Type **`src/components`** and press Enter
   - `Configure the import alias for utils?` → Type **`src/lib/utils`** and press Enter

3. **Install your first component (Button):**
   ```bash
   npx shadcn-ui@latest add button
   ```

✅ **Success Checkpoint:** You should see "Added button component" message!

---

## 🟢 Step 6: Test Everything Works

1. **Create a test page to make sure everything works:**
   
   Open `src/App.jsx` and replace ALL content with:
   ```jsx
   import { Button } from "@/components/ui/button"
   import './App.css'

   function App() {
     return (
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
         <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
           <div className="text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">
               🎉 Success!
             </h1>
             <h2 className="text-xl text-gray-600 mb-6">
               Your Booking App Environment is Ready
             </h2>
             <div className="space-y-4">
               <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                 <p className="text-green-800 text-sm">
                   ✅ React + Vite: Lightning fast development
                 </p>
               </div>
               <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                 <p className="text-blue-800 text-sm">
                   ✅ Tailwind CSS: Beautiful styling ready
                 </p>
               </div>
               <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                 <p className="text-purple-800 text-sm">
                   ✅ shadcn/ui: Professional components
                 </p>
               </div>
               <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                 Start Building Your Booking App!
               </Button>
             </div>
           </div>
         </div>
       </div>
     )
   }

   export default App
   ```

2. **Start your app again:**
   ```bash
   npm run dev
   ```

3. **Check your browser:**
   - Go to `http://localhost:5173`
   - You should see a beautiful styled page with a working button!

🎉 **CONGRATULATIONS!** Your React.js development environment is completely set up!

---

## 🚨 Troubleshooting Common Issues

### "npm is not recognized" or "command not found"
**Solution:** 
- Close your terminal/command prompt
- Open a new one
- If still not working, restart your computer

### "Port 5173 is already in use"
**Solution:**
```bash
npm run dev -- --port 3000
```

### "Permission denied" (Mac users)
**Solution:**
```bash
sudo npm install
```
(Enter your Mac password when prompted)

### Installation seems stuck
**Solution:**
```bash
npm cache clean --force
npm install
```

### Can't find the project folder
**Solution:**
- Look on your Desktop for a folder called `booking-app`
- If you can't find it, repeat Step 2 from your Desktop directory

---

## 📁 Your Project Structure

Your `booking-app` folder now contains:
```
booking-app/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components live here
│   ├── lib/
│   │   └── utils.js      # Helper functions
│   ├── App.jsx           # Your main app file
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── public/               # Static files (images, etc.)
├── index.html           # Main HTML file
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

---

## 🎯 What to Do Next

### 1. Add More UI Components
Install components you'll need for your booking app:
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
```

### 2. Start Building Your Booking Features
Common booking app components you might want:
- **Date picker** for selecting booking dates
- **Forms** for user information
- **Cards** to display booking options
- **Dialogs** for confirmations
- **Tables** for showing booking history

### 3. Learn the Basics
- Edit `src/App.jsx` to modify your app
- Create new components in `src/components/`
- Use Tailwind classes for styling (like `bg-blue-500`, `text-white`, `p-4`)

---

## 🔥 Pro Tips for Beginners

1. **Keep your terminal open** while developing - you'll need it
2. **Save your files** - the browser auto-refreshes when you save
3. **Use the browser's developer tools** - Press F12 to see errors
4. **Start small** - Make tiny changes and see what happens
5. **Copy examples** - Use the shadcn/ui documentation for component examples

---

## 📚 Helpful Resources

- **React Documentation:** https://react.dev
- **Vite Documentation:** https://vitejs.dev  
- **Tailwind CSS:** https://tailwindcss.com
- **shadcn/ui Components:** https://ui.shadcn.com
- **CSS Classes Reference:** https://tailwindcss.com/docs

---

## 🎊 You Did It!

You now have a professional React.js development environment with:
- ⚡ **Vite** for super-fast development
- 🎨 **Tailwind CSS** for beautiful styling
- 🧩 **shadcn/ui** for professional components
- 🔥 **Hot reloading** so changes appear instantly

**Ready to build your booking app?** Start by modifying `src/App.jsx` and watch the magic happen!

Need help with specific features? Just ask! 🚀