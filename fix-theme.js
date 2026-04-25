import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, 'src')

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f)
    let isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx')) return
  let content = fs.readFileSync(filePath, 'utf-8')
  let origContent = content

  // Backgrounds
  content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-slate-50 dark:bg-[#0a0a0a]')
  content = content.replace(/bg-\[\#0d0d0d\]/g, 'bg-white dark:bg-[#0d0d0d]')
  
  // Text colors
  // Avoid replacing if it's already done
  content = content.replace(/(?<!dark:)text-white(?!\/)/g, 'text-slate-900 dark:text-white')
  
  // Text colors with opacity
  content = content.replace(/(?<!dark:)text-white\/(\d+)/g, 'text-slate-900/$1 dark:text-white/$1')
  
  // Borders
  content = content.replace(/(?<!dark:)border-white\/(\d+)/g, 'border-slate-900/10 dark:border-white/$1')
  
  // bg-white with opacity (overlays etc)
  content = content.replace(/(?<!dark:)bg-white\/(\d+)/g, 'bg-slate-900/5 dark:bg-white/$1')
  
  // bg-black with opacity (overlays)
  content = content.replace(/(?<!dark:)bg-black\/(\d+)/g, 'bg-white/$1 dark:bg-black/$1')

  // Reverts for buttons / specific colored backgrounds
  // E.g. bg-indigo-600 text-slate-900 dark:text-white -> bg-indigo-600 text-white
  // E.g. bg-emerald-400
  const colorBgs = ['indigo', 'cyan', 'emerald', 'red', 'green', 'yellow', 'purple', 'black']
  
  colorBgs.forEach(color => {
    // This is tricky. Let's just fix known patterns.
    // E.g. className="... bg-indigo-600 ... text-slate-900 dark:text-white ..."
    // Easiest is to just do a pass that looks for bg-COLOR- and reverts text-slate-900 dark:text-white to text-white
    const regex = new RegExp(`(bg-${color}-\\d+\\s+[^"'\`]*?)text-slate-900 dark:text-white`, 'g')
    content = content.replace(regex, '$1text-white')
    const regex2 = new RegExp(`(bg-${color}-\\d+/\\d+\\s+[^"'\`]*?)text-slate-900 dark:text-white`, 'g')
    content = content.replace(regex2, '$1text-white')
    // Opacity variations
    const regex3 = new RegExp(`(bg-${color}-\\d+\\s+[^"'\`]*?)text-slate-900/\\d+ dark:text-white/(\\d+)`, 'g')
    content = content.replace(regex3, '$1text-white/$2')
  })

  // Specific fix for "text-slate-900 dark:text-white ... bg-indigo" where order is reversed
  // We can just revert all buttons since they have bg-indigo-600
  // Actually, we'll manually check diffs.

  // Also fix `<span className="text-slate-900 dark:text-white">` inside gradients:
  // "gradient-text text-slate-900 dark:text-white" -> "gradient-text" or similar
  content = content.replace(/gradient-text text-slate-900 dark:text-white/g, 'gradient-text')
  
  // Revert EasterEgg terminal colors
  if (filePath.includes('EasterEgg.tsx')) {
    content = origContent
  }

  // Restore `placeholder:text-white/20` inside EasterEgg or Contact
  content = content.replace(/placeholder:text-slate-900\/\d+ dark:text-white\/(\d+)/g, 'placeholder:text-slate-900/50 dark:placeholder:text-white/$1')

  if (content !== origContent) {
    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`Updated ${filePath}`)
  }
}

walkDir(srcDir, processFile)
console.log('Done.')
