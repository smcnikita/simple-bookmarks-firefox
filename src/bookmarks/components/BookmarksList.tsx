import { Fragment } from 'react';
import type { SavedTabData } from '@t/index';
import BookmarkItem from './BookmarkItem';

type Props = {
    tabs: SavedTabData[];
    onClick: (url: string | undefined, title: string | undefined) => Promise<void>;
    renameTab: (url: string, newTitle: string) => Promise<void>;
};

const BookmarksList = ({ tabs, onClick, renameTab }: Props) => {
    if (tabs.length === 0) {
        return <div>{browser.i18n.getMessage('no_bookmarks')}</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            {tabs.map((tab, index) => (
                <Fragment key={tab.url + '_' + index}>
                    <BookmarkItem tab={tab} onClick={onClick} renameTab={renameTab} />
                    {index !== tabs.length - 1 && <div className="bg-gray-300 h-px" />}
                </Fragment>
            ))}
        </div>
    );
};

export default BookmarksList;
