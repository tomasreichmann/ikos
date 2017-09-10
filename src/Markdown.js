import React, {Component} from 'react';
import classNameMapper from './classNameMapper';
import marked from 'marked';

const Markdown = ({
    children = 'no content',
    className = '',
    makeLinksIntoButtons = false,
    linksDownload = false,
}) => {
    let content = marked(children);
    if (makeLinksIntoButtons) {
        content = content.replace( /<a /g, '<a class="btn" ' );
    }
    if (linksDownload) {
        content = content.replace( /<a /g, '<a download ' );
    }
    return <div className={"Markdown"} dangerouslySetInnerHTML={{__html: content}} />;
};

export default Markdown;