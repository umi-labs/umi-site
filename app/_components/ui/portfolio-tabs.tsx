import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';

export default function PortfolioTabs() {
  return (
    <Tabs defaultValue="1" className="col-span-2 h-full w-full">
      <TabsList className="flex h-auto w-full items-center justify-start rounded-none border-b border-border bg-transparent p-0 font-normal text-primary-foreground">
        <TabsTrigger
          value="1"
          className="relative rounded-none py-2 font-normal after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-primary-foreground data-[state=active]:text-primary-background data-[state=active]:shadow-none data-[state=active]:after:bg-primary-accent"
        >
          Portfolio
        </TabsTrigger>
        <TabsTrigger
          value="2"
          className="relative rounded-none py-2 font-normal after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-primary-foreground data-[state=active]:text-primary-background data-[state=active]:shadow-none data-[state=active]:after:bg-primary-accent"
        >
          Case Studies
        </TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <p className="p-4 text-center text-xs text-primary-foreground">
          Content for Tab 1
        </p>
      </TabsContent>
      <TabsContent value="2">
        <p className="p-4 text-center text-xs text-primary-foreground">
          Content for Tab 2
        </p>
      </TabsContent>
    </Tabs>
  );
}
