This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## ✅ Next.js의 .env 파일 인식 규칙

Next.js에서는 아래와 같은 규칙으로 .env 파일을 로드합니다:

NODE_ENV 값	자동으로 로드되는 파일

| NODE\_ENV 값      | 자동으로 로드되는 파일                                       |
| ---------------- | -------------------------------------------------- |
| development (기본) | `.env`, `.env.development.local`, `.env.local`     |
| production       | `.env`, `.env.production`, `.env.production.local` |
| test             | `.env`, `.env.test`, `.env.test.local`             |

✅ NODE_ENV=production일 때만 .env.production이 로드됨
✅ NODE_ENV=prod는 아무런 의미 없음 → Next.js가 무시함

그리고 빌드/실행 시 다음처럼 실행:

```
NODE_ENV=production next build
NODE_ENV=production next start

```

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
