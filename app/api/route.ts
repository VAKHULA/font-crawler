const playwright = require("playwright")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url') as string

  const browser = await playwright['chromium'].launch({
    headless: true,
  })
  const context = await browser.newContext()
  const page = await context.newPage()

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
