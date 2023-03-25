import {test, expect} from '@playwright/test'

test('navigation smoke test', async ({page}) => {
	// start at the home page
	await page.goto('/')

	await expect(page).toHaveTitle(/Emoji of the/i)
	await expect(page.locator('role=heading[level=1]')).toHaveText('Emoji of the...')

	// navigate to the Advice Page
	await page.locator('role=link[name=Advice]').click()

	await expect(page).toHaveTitle(/How would X make content about/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('Content Creation Advice')

	// navigate to the About Page
	await page.locator('role=link[name=About]').click()

	await expect(page).toHaveTitle(/About/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('About')
})
