import { useState } from 'react';

import { TABS_STORAGE_KEY } from '@const/index';

import type { SavedTabData } from '@t/index';

const useTabs = () => {
    const [tabs, setTabs] = useState<SavedTabData[]>([]);

    const updateTabs = (newTabs: SavedTabData[]) => {
        setTabs(newTabs);
    };

    const loadTabsFromStorage = async () => {
        const storedData = await browser.storage.local.get(TABS_STORAGE_KEY);
        if (storedData[TABS_STORAGE_KEY]) {
            setTabs(JSON.parse(storedData[TABS_STORAGE_KEY]) as SavedTabData[]);
        }
    };

    const saveTabsToStorage = async (tabsToSave: SavedTabData[]) => {
        await browser.storage.local.set({
            [TABS_STORAGE_KEY]: JSON.stringify(tabsToSave),
        });
        await loadTabsFromStorage();
    };

    const removeTab = async (url?: string, title?: string) => {
        const filteredTabs = tabs.filter((tab) => tab.url !== url && tab.title !== title);
        await saveTabsToStorage(filteredTabs);
    };

    const renameTab = async (url: string, newTitle: string) => {
        const newTabs = tabs.map((el) => {
            if (el.url === url) {
                return {
                    ...el,
                    title: newTitle,
                };
            } else {
                return el;
            }
        });
        await saveTabsToStorage(newTabs);
        await loadTabsFromStorage();
    };

    return { tabs, updateTabs, loadTabsFromStorage, removeTab, renameTab };
};

export default useTabs;
