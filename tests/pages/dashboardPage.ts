import { Page, Locator, expect, FrameLocator, APIRequestContext } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly iframe: FrameLocator;

    // Locators
    readonly downloadCostDataButton: Locator;
    readonly costMonitoringLink: Locator;
    readonly costDataText: Locator;
    readonly costMonitoringVisualizationText: Locator;

    // URLs
    readonly dashboardUrl = 'https://finops-demo.streamlit.app/';
    readonly apiBaseUrl = 'https://finops-demo.streamlit.app/api/v2';

    constructor(page: Page) {
        this.page = page;
        this.iframe = page.frameLocator('iframe[title="streamlitApp"]');

        // Initialize locators within the iframe
        this.downloadCostDataButton = this.iframe.getByText('📥 Download Cost Data');
        this.costMonitoringLink = this.iframe.getByRole('link', { name: 'Cost Monitoring' });
        this.costDataText = this.iframe.getByText('Cost Data');
        this.costMonitoringVisualizationText = this.iframe.getByText('📊 Cost Monitoring & Visualization');
    }

    /**
     * Navigate to the dashboard page
     */
    async navigateToDashboard() {
        await this.page.goto(this.dashboardUrl);
    }

    /**
     * Verify that the dashboard page has loaded successfully
     */
    async verifyDashboardLoaded() {
        await expect(this.page).toHaveTitle('FinOps Dashboard · Streamlit');
    }

    /**
     * Click on the Download Cost Data button
     */
    async clickDownloadCostData() {
        await this.downloadCostDataButton.click();
    }

    /**
     * Verify that Cost Data text is visible
     */
    async verifyCostDataVisible() {
        await expect(this.costDataText).toBeVisible();
    }

    /**
     * Click on Cost Monitoring link in the menu
     */
    async clickCostMonitoring() {
        await this.costMonitoringLink.click();
    }

    /**
     * Verify that Cost Monitoring & Visualization section is visible
     */
    async verifyCostMonitoringVisualizationVisible() {
        await expect(this.costMonitoringVisualizationText).toBeVisible();
    }

    /**
     * Complete flow: Navigate and verify dashboard is loaded
     */
    async openDashboard() {
        await this.navigateToDashboard();
        await this.verifyDashboardLoaded();
    }

    /**
     * Complete flow: Download cost data and verify
     */
    async downloadAndVerifyCostData() {
        await this.clickDownloadCostData();
        await this.verifyCostDataVisible();
    }

    /**
     * Complete flow: Open cost monitoring section and verify
     */
    async openAndVerifyCostMonitoring() {
        await this.clickCostMonitoring();
        await this.verifyCostMonitoringVisualizationVisible();
    }

}
