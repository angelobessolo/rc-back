import htmlToPdfmake  from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
    [key: string]: string;
}

export const getHtmlContent = (html: string, replacers: ContentReplacer = {}): string => {
    Object.entries(replacers).forEach(([key, value]) => {
        const valueKey = `{{ ${key} }}`;

        html = html.replaceAll(valueKey, value);
    });

    const { window } = new JSDOM(html);
    return htmlToPdfmake(html, { window });
}