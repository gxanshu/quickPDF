import Store from './store'
import { ipcMain } from 'electron'
import { generatePDF } from '../utils'
/**
 * direct bindings for DataBase
 * with just storeName, key, value
 */
const store = new Store()

export function DbCalls(): void {
  ipcMain.handle('setDB', (_, args) => {
    store.set(args.storeName, args.key, args.value)
  })

  ipcMain.handle('getDB', (_, args) => {
    const result = store.get(args.storeName, args.key)
    return result
  })

  ipcMain.handle('save', async (_, args) => {
    store.setPDF(args.info.companyName, args.info.date, args.codeOfPaper)
    // generating PDF
    const pdfBuffer = await generatePDF(args.html, args.info.width, args.info.height)
    return pdfBuffer
  })

  ipcMain.handle('getPapers', (_, args) => {
    const papers = store.getPDF(args.companyName)
    return papers
  })

  ipcMain.handle('getPapersWithDate', (_, args) => {
    const htmlCodeOfPaper = store.getPDFOnDate(args.companyName, args.date)
    return htmlCodeOfPaper
  })
}
