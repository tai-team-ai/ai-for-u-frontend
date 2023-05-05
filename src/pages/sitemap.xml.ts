import { TEMPLATE_CARD_OBJECTS } from '@/utils/constants'
import { type GetServerSideProps } from 'next'

const generateSiteMap = (): string => {
  const externalDataUrl = 'https://aiforu.app/templates'
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://aiforu.app</loc>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://aiforu.app/templates</loc>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://aiforu.app/sandbox</loc>
      <priority>0.80</priority>
    </url>
    ${TEMPLATE_CARD_OBJECTS.map(({ href }) => {
      return `
    <url>
      <loc>${`${externalDataUrl}${href}`}</loc>
      <priority>0.64</priority>
    </url>`
    }).join('')}
  </urlset>
`
}

const SiteMap = (): void => {

}

const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap()
  console.log(sitemap)
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  return {
    props: {}
  }
}

export { getServerSideProps }
export default SiteMap
