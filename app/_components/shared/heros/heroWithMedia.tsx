'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { HeroWithMediaProps } from '@/types/components/heroWithMedia';
import Link from '@/app/_components/ui/link';
import Image from 'next/image';

export default function HeroWithMedia({ data }: HeroWithMediaProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-full w-full items-center justify-center overflow-visible text-black'
      )}
    >
      {data?.background !== 'dark' && (
        <BackgroundSVG className="absolute bottom-0 left-0 -z-10 h-auto w-full md:w-2/3 2xl:w-1/2" />
      )}
      <div
        className={cn(
          'relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-y-10 py-10 text-center md:py-32',
          data?.background === 'light' ? 'text-[#313E4E]' : 'text-white'
        )}
      >
        {data?.background === 'dark' && (
          <div
            className={cn(
              'absolute left-0 top-0 -z-10 flex h-1/2 w-full items-end justify-end bg-[#313E4E] text-white'
            )}
          >
            <div className="relative h-full w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1440"
                height="110"
                viewBox="0 0 1440 110"
                fill="none"
                className="absolute bottom-0 left-0 -z-10 h-auto w-full translate-y-1/2 pb-6 md:pb-10 lg:pb-14"
              >
                <path
                  d="M520.766 0.805773C390.85 1.61154 119.457 31.8058 0 46.8058V109.806H1440V86.8058C1185.38 80.7899 846.57 -1.21494 520.766 0.805773Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        )}
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center gap-y-10 px-6 md:px-28'
          )}
        >
          {data?.separator && <EyebrowSVG className="" />}
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <div className="flex w-full items-center justify-center gap-6">
            {data?.buttons?.map((button, i) => (
              <Link
                key={i}
                link={button.link}
                size="default"
                variant={button.type}
                className="w-full md:w-fit"
              >
                {button.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-6 md:px-28">
          {data?.mediaType === 'image' ? (
            data?.image && (
              <Image
                src={data.image.asset.url}
                alt={data.image.asset.altText || ''}
                width={data.image.asset.metadata.dimensions.width}
                height={data.image.asset.metadata.dimensions.height}
              />
            )
          ) : (
            <video src={data.video?.src} />
          )}
        </div>
        {data?.bottomContent && (
          <div className="flex flex-col items-center justify-center gap-y-10 px-6 text-primary-foreground md:px-28">
            <h2>{data.bottomContent.title}</h2>
            <p>{data.bottomContent.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

const BackgroundSVG = (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      width="826"
      height="862"
      viewBox="0 0 826 862"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M718.925 548.076C999.693 368.251 654.238 210.074 513.854 97.0812C172.459 -208.587 -43.21 279.84 77.4928 571.96C190.213 865.267 542.343 694.73 718.925 548.006"
        fill="#EBF7F9"
      />
      <path
        opacity="0.8"
        d="M354.195 136.87C576.194 139.733 575.644 489.258 635.72 646.247C762.41 992.559 41.9088 819.088 -23.8103 654.627C-112.445 444.284 98.8882 166.48 354.195 136.87ZM461.134 857.777C790.831 898.351 621.75 554.414 583.42 376.893C509.512 -78.6408 37.7798 161.731 -50.8549 465.514C-146.44 764.827 232.735 858.336 461.134 857.777Z"
        fill="#D8EFF3"
      />
    </svg>
  );
};

const EyebrowSVG = (props: React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      width="125"
      height="35"
      viewBox="0 0 125 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M70.3896 5.23544C69.912 4.86491 69.2884 4.74886 68.6896 4.62467C66.2298 4.10754 63.7551 3.64946 61.2458 3.33186C58.0477 2.94287 54.8134 2.79227 51.5823 2.88192C49.3056 2.93485 47.0487 3.16287 44.7894 3.37461C43.9703 3.45197 43.1512 3.52934 42.3296 3.5782C41.9353 3.59377 41.5401 3.57878 41.1492 3.53341C40.8893 3.50898 40.5948 3.44791 40.5602 3.17917C40.5256 2.91042 40.8473 2.8473 41.0551 2.72718C41.14 2.68637 41.2317 2.65618 41.3273 2.6376C43.9035 1.96778 46.4672 1.27354 49.1151 0.805273C50.6651 0.53218 52.236 0.347158 53.8169 0.251507C55.1334 0.172106 56.445 0.0479097 57.7615 0.0295864C64.4431 -0.0599942 70.8598 1.01701 77.0638 3.0285C78.8406 3.60466 80.5852 4.25005 82.2779 4.96262V5.23544H70.3896Z"
        fill="#C4E6EC"
      />
      <path
        d="M82.6594 5.27795C83.34 5.54058 84.0131 5.82154 84.706 6.05975C85.6958 6.40382 86.7228 6.72754 87.7423 7.03904C90.09 7.75768 92.3441 8.66823 94.4708 9.75702C97.4042 11.2684 100.449 12.6283 103.587 13.8289C104.785 14.2809 106.003 14.6983 107.23 15.0912C109.38 15.7794 111.462 16.5917 113.528 17.4346C115.357 18.1818 117.193 18.9167 119.044 19.6273C120.47 20.1914 121.963 20.6342 123.498 20.9486C123.751 21.0023 123.999 21.0703 124.241 21.1522C124.404 21.1872 124.557 21.2508 124.688 21.3386C124.819 21.4265 124.925 21.5365 125 21.6612C124.727 21.895 124.361 22.0397 123.968 22.0684C122.148 22.3244 120.302 22.4416 118.455 22.4186C115.174 22.4023 111.962 21.9544 108.779 21.3416C106.277 20.859 103.785 20.346 101.387 19.5703C99.0876 18.8269 96.8591 17.9422 94.7208 16.9236C92.4936 15.8649 90.2986 14.7695 88.0987 13.6783C84.3554 11.7998 80.608 9.92601 76.8564 8.05701C74.8471 7.01928 72.7345 6.12364 70.5412 5.37974C70.4844 5.35292 70.4333 5.31852 70.3902 5.27795H82.6594Z"
        fill="#C4E6EC"
      />
      <path
        d="M0.11886 28.4745C0.0641713 28.3641 0.0243221 28.2491 3.55352e-05 28.1315C3.55352e-05 27.5297 3.55352e-05 26.9279 3.55352e-05 26.3282C-0.00115054 26.205 0.0273656 26.0828 0.0839071 25.9689C0.140449 25.855 0.223874 25.7516 0.329279 25.6648C1.26007 24.8227 2.16611 23.9581 3.15631 23.1427C4.26039 22.2102 5.41646 21.3188 6.57252 20.4151C11.4245 16.6566 16.7568 13.4731 22.7896 11.1399C25.2747 10.1852 27.8393 9.38011 30.4637 8.73076C30.9365 8.61369 31.4143 8.49868 31.8747 8.35491C35.1403 7.32393 38.5117 6.54027 41.9476 6.01351C45.0302 5.53471 48.1722 5.3726 51.3026 5.53085C53.3424 5.64176 55.3772 5.77937 57.4022 6.02789C60.7217 6.44529 63.9927 7.09456 67.1805 7.96878C70.4754 8.86016 73.6762 9.94048 76.8672 11.0496C78.3252 11.5569 79.7907 12.0477 81.2612 12.5325C83.5808 13.318 85.8166 14.2641 87.9451 15.3606C90.99 16.8928 94.0225 18.4414 97.0797 19.951C100.286 21.5784 103.634 23.005 107.096 24.2189C108.284 24.6297 109.48 25.0137 110.665 25.4266C111.331 25.6607 111.987 25.9174 112.646 26.1844C112.911 26.2974 113.161 26.4352 113.388 26.5952C113.431 26.6332 113.463 26.6789 113.481 26.7288C113.499 26.7787 113.503 26.8314 113.492 26.8827C113.466 26.9293 113.427 26.9705 113.379 27.0031C113.331 27.0358 113.275 27.0592 113.215 27.0717C113.02 27.0899 112.822 27.0947 112.626 27.0861C107.492 27.2155 102.521 26.4432 97.6392 25.2068C95.8742 24.7591 94.1314 24.2559 92.3886 23.7691C90.6768 23.2699 89.0383 22.6119 87.5044 21.8077C85.9647 21.0108 84.4546 20.181 82.9421 19.343C78.7003 17.027 74.2369 15.0034 69.5966 13.2924C68.1779 12.7786 66.7043 12.3763 65.1951 12.0909C62.3786 11.514 59.5138 11.1137 56.6249 10.8935C55.0827 10.7846 53.528 10.762 51.9808 10.7723C49.1117 10.7887 46.2476 10.9346 43.3859 11.1256C39.6112 11.4128 35.8671 11.9304 32.1842 12.6742C31.514 12.8142 30.853 12.9829 30.2038 13.1794C22.6473 15.3341 15.5416 18.4523 9.1421 22.4218C6.41904 24.1141 3.77519 25.8743 1.26007 27.7721C0.99024 27.9774 0.717934 28.1828 0.440677 28.3677C0.338538 28.4131 0.230595 28.4489 0.11886 28.4745Z"
        fill="#D8EFF3"
      />
      <path
        d="M104.722 30.7497C104.42 31.045 104.073 31.0266 103.707 30.9917C102.1 30.8461 100.489 30.7271 98.8899 30.561C96.4006 30.3275 93.9352 29.9436 91.5134 29.4124C89.3451 28.9371 87.2502 28.2557 85.2707 27.3819C82.5197 26.143 79.7762 24.8939 77.0402 23.6346C71.755 21.222 66.1649 19.2995 60.3713 17.9019C57.367 17.17 54.2919 16.6546 51.1804 16.3615C50.2967 16.2795 49.4056 16.2097 48.517 16.1974C47.8588 16.2107 47.202 16.2524 46.5491 16.3226C43.8888 16.5055 41.2438 16.8185 38.628 17.2599C32.199 18.3808 26.0304 20.354 20.3601 23.1034C17.4491 24.5001 14.5653 25.9297 11.7682 27.4783C10.1926 28.3267 8.68527 29.2592 7.25569 30.2697C6.83488 30.5733 6.36952 30.8358 5.91406 31.1045C5.68385 31.2378 5.66653 31.2214 5.17146 31.1045C5.06502 30.7743 5.31503 30.5343 5.50068 30.2841C6.19686 29.3223 7.04332 28.4409 8.01809 27.6629C9.42528 26.5472 10.9079 25.4988 12.4588 24.5227C14.664 23.1341 16.9686 21.8573 19.3601 20.6995C23.8354 18.5439 28.4198 16.5646 33.3778 15.2437C37.0908 14.2551 40.8558 13.4675 44.7272 13.0962C47.6753 12.8152 50.6358 12.5917 53.6087 12.8501C57.542 13.1926 61.4803 13.4962 65.317 14.3535C67.8039 14.8947 70.229 15.6146 72.5648 16.5051C73.3074 16.7943 74.0153 17.1471 74.7431 17.465C75.7332 17.8998 76.7011 18.3736 77.7135 18.7551C79.6924 19.5034 81.6077 20.362 83.4463 21.3251C84.9018 22.0758 86.3499 22.8347 87.8103 23.5812C89.5858 24.4724 91.4354 25.2578 93.3452 25.9318C94.8304 26.465 96.2487 27.0988 97.6844 27.708C98.6746 28.1325 99.6424 28.6145 100.655 29.0268C101.714 29.4657 102.806 29.8472 103.885 30.2574C104.177 30.3682 104.521 30.4113 104.722 30.7497Z"
        fill="#C4E6EC"
      />
      <path
        d="M96.2463 34.6303C95.9983 34.8832 95.6609 34.8342 95.3335 34.8098C92.3087 34.5777 89.3147 34.1273 86.386 33.4639C81.0766 32.2509 75.909 30.652 70.9443 28.6862C67.4445 27.2739 63.7578 26.1989 59.9577 25.4827C58.1497 25.1631 56.3222 24.9235 54.483 24.7649C54.0564 24.7241 53.6347 24.6609 53.213 24.5936C51.6909 24.3365 50.1373 24.227 48.5842 24.2673C42.1346 24.5039 35.8711 25.5234 29.8904 27.5565C27.3478 28.4211 25.0161 29.614 22.7835 30.9292C22.1113 31.3248 21.4465 31.7266 20.7718 32.1181C20.5579 32.2456 20.3304 32.3568 20.0921 32.4505C20.0003 32.4872 19.8589 32.4341 19.6729 32.4158C19.7011 32.3003 19.7505 32.1889 19.8192 32.0855C20.3897 31.5247 20.938 30.9435 21.5556 30.4215C22.9524 29.2255 24.4711 28.1298 26.0951 27.1466C31.0377 24.1697 36.647 22.0249 42.601 20.8354C45.6575 20.2481 48.7696 19.8776 51.9032 19.7281C52.7932 19.6718 53.6878 19.6929 54.5723 19.7914C55.0983 19.8329 55.6271 19.8438 56.155 19.824C61.962 19.8419 67.6767 21.0197 72.8072 23.2559C74.6478 24.0471 76.4437 24.9158 78.2124 25.813C80.4053 26.9264 82.551 28.0989 84.7066 29.2592C86.426 30.2213 88.2614 31.0351 90.1838 31.6878C90.8566 31.9136 91.5104 32.1758 92.141 32.4729C93.354 33.0255 94.5496 33.6046 95.7502 34.1736C95.9735 34.2816 96.2463 34.3632 96.2463 34.6303Z"
        fill="#D8EFF3"
      />
    </svg>
  );
};
