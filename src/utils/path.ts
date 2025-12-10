export const getAsset = (filename: string): string => {
  const base = import.meta.env.BASE_URL
  const cleanFilename = filename.replace(/^\//, '')
  
  // В Tauri .exе: BASE_URL = './'
  if (base === './') {
    return `./${cleanFilename}`
  }
  
  // В вебе: BASE_URL = '/frontend-utility-services/'
  return `${base}${cleanFilename}`
}