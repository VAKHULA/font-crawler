const puppeteer = require('puppeteer');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const fonts = await page.evaluate(() => {
    const fonts = {}
    const elements = document.body.getElementsByTagName("*");

    // @ts-ignore
    [...elements].map(element => {
      element.focus();

      const font = window.getComputedStyle(element).getPropertyValue("font-family");

      // @ts-ignore
      fonts[font] = 0

      return font
    })

    return fonts
  })

  await browser.close();

  return Response.json([...Object.keys(fonts)])
}