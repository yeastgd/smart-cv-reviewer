This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```.next/``` — автогенерируемая папка, Next.js собирает сюда готовый код при запуске. Никогда не трогаешь руками.

```node_modules/``` — все установленные библиотеки. Тоже не трогаешь, и в Git не пушишь (он уже в ```.gitignore```).

```public/``` — статичные файлы: картинки, иконки, шрифты. Всё что здесь лежит доступно напрямую по URL. Эти SVG-шки от Next.js нам не нужны — можешь их удалить.

```src/app/``` — это самое важное. Здесь живёт твоё приложение:

- ```page.js``` — это главная страница (/), то что видит пользователь
- ```layout.js``` — обёртка вокруг всех страниц (навбар, футер, общие стили)
- ```globals.css``` — глобальные стили
- ```favicon.ico``` — иконка вкладки браузера

Конфиги в корне:

- ```next.config.mjs``` — настройки Next.js
- ```tailwind.config.js``` — настройки Tailwind
- ```package.json``` — список зависимостей проекта
- ```.gitignore``` — что не пушить в Git
- ```eslint.config.mjs``` — проверка кода на ошибки