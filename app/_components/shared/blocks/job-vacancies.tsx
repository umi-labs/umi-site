'use client';
import React from 'react';
import { EyebrowSVG } from '@/app/_components/ui/svg-comps';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedJobs } from '@/app/_actions/job';
import Link from '@/app/_components/ui/link';
import { Button } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';

interface Props {
  data: {
    separator?: boolean | undefined;
    title: string;
    description: string;
  };
}

export default function JobVacancies({ data }: Props) {
  const { data: jobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getFeaturedJobs(),
  });

  return (
    <section className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-center gap-y-12 px-10 py-10 md:py-24 lg:gap-y-24">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {data.separator && <EyebrowSVG className="" />}
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div className="grid w-full grid-flow-row grid-cols-1 items-center justify-center gap-9">
        {jobs?.map((job, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center gap-y-6 overflow-clip bg-primary-foreground text-primary-background"
          >
            <div className="absolute inset-0 size-full bg-[url('/assets/images/job-svg-pattern.svg')] bg-cover bg-no-repeat" />
            <div className="z-10 flex size-full flex-col items-center justify-between gap-6 px-10 py-12 md:flex-row lg:px-20 lg:py-24">
              <div className="flex flex-col justify-between gap-y-3 md:gap-y-10">
                <h3 className="text-2xl font-semibold">{job.name}</h3>
                <span>
                  {job.location} | {job.type}
                </span>
              </div>
              <div className="flex w-full flex-col gap-3 md:w-fit">
                <Link
                  variant="secondary"
                  size="default"
                  className="w-full text-xl font-semibold hocus:bg-transparent"
                >
                  Apply Now
                </Link>
                <DescriptionDialog job={job} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const DescriptionDialog = ({ job }: { job: any }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="border-primary-background text-xl font-semibold text-primary-background hocus:bg-primary-background hocus:text-primary-foreground"
        >
          See Description
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-12rem)] overflow-y-scroll bg-primary-background p-6 text-primary-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {job.name}
          </DialogTitle>
          <DialogDescription className="overflow-scroll text-lg font-medium">
            <CustomPortableText value={job.description} />
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="text-lg font-medium">
          {job.location} | {job.type}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Link
              variant="default"
              size="default"
              className="text-xl font-semibold hocus:bg-transparent"
            >
              Apply Now
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      <DialogPortal />
    </Dialog>
  );
};
