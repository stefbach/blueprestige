import { chromium } from 'playwright'
const OUT = '/tmp/claude-0/-home-user-blueprestige/7b07e727-bd40-5a4c-873d-71fc42025225/scratchpad/shots'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errs = []
page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))
await page.goto('http://localhost:4173/visite/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/tour-01.png` })
await page.click('.nav.next'); await page.waitForTimeout(900)
await page.click('.step-chip:nth-child(4)'); await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}/tour-02.png` })
await page.click('[data-level="1"]'); await page.waitForTimeout(700)
await page.screenshot({ path: `${OUT}/tour-03.png` })
console.log('ERRORS:', errs.length ? JSON.stringify(errs, null, 2) : 'none')
await browser.close()
