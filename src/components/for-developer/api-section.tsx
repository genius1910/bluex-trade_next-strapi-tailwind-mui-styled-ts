import { LocalizedContent } from '@/cms/for-developer-page';
import APITable from './api-table';

const APITableSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <div className="relative h-auto w-full">
      <div className="mx-auto my-0 box-border flex w-full flex-col items-center px-[1.25rem] pb-[6.25rem] pt-[5rem] lg:w-[60rem] lg:px-0">
        <div className="font-stretch-normal font-style-normal font-roboto leading-2.875rem mb-[3.063rem] text-center text-[1.75rem] font-black tracking-tighter text-secondary">
          {content.Section_4_Title}
        </div>
        <div className="flex w-full justify-center">
          <APITable
            firstRowData={content.Section_4_Table_Row_Data_1}
            firstRowHeader={content.Section_4_Table_Row_Header_1}
            secondRowData={content.Section_4_Table_Row_Data_2}
            secondRowHeader={content.Section_4_Table_Row_Header_2}
            thirdRowData={content.Section_4_Table_Row_Data_3}
            thirdRowHeader={content.Section_4_Table_Row_Header_3}
          />
        </div>
      </div>
    </div>
  );
};

export default APITableSection;
