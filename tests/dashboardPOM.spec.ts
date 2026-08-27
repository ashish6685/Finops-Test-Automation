import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboardPage';

test.describe('Dashboard Page Tests using POM', () => {

    test('Verify Dashboard page opens successfully', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // Navigate and verify dashboard is loaded
        await dashboardPage.openDashboard();
    });

    test('Verify Cost Monitoring section can be opened', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // Navigate to dashboard
        await dashboardPage.navigateToDashboard();

        // Open and verify Cost Monitoring section
        await dashboardPage.openAndVerifyCostMonitoring();
    });

    test('Navigate between different sections', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // Navigate to dashboard
        await dashboardPage.openDashboard();

        // Click on Cost Monitoring
        await dashboardPage.clickCostMonitoring();
        await dashboardPage.verifyCostMonitoringVisualizationVisible();
    });
});
