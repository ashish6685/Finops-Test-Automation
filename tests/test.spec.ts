import {test, expect} from '@playwright/test';

test('Verify Dashboard page Opens', async ({page}) => {

    await page.goto('https://finops-demo.streamlit.app/');

    const frame = page.frameLocator('iframe[title="streamlitApp"]');

    await expect(page).toHaveTitle('FinOps Dashboard · Streamlit');

});

test('Open Menu Cost Monitoring', async({page}) => {
    await page.goto('https://finops-demo.streamlit.app/');

    const frame = page.frameLocator('iframe[title="streamlitApp"]');

    await frame.getByRole('link', {name:'Cost Monitoring'}).click();

    //await expect(frame.getByRole('heading', {name='📊 Cost Monitoring & Visualization'})).toBeVisible();
    await expect(frame.getByText('📊 Cost Monitoring & Visualization')).toBeVisible();
});

test('API validation - Verify app status endpoint', async({request}) => {
    // Send GET request to the app status API
    const response = await request.get('https://finops-demo.streamlit.app/api/v2/app/status');

    // Verify status code is 200 OK
    expect(response.status()).toBe(200);

    // Parse response body
    const body = await response.json();

    // Validate response body structure
    expect(body).toBeDefined();
    expect(body).not.toBeNull();

    // Verify response headers
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');

    // Log response for debugging
    console.log('API Response:', JSON.stringify(body, null, 2));
    console.log('Response Status:', response.status());
    console.log('Response OK:', response.ok());

    // Verify response is successful
    expect(response.ok()).toBeTruthy();
});