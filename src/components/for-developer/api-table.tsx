import { TableRowList } from '@/cms/for-developer-page';

interface APITableProps {
  firstRowData: TableRowList[];
  firstRowHeader: String;
  secondRowData: TableRowList[];
  secondRowHeader: String;
  thirdRowData: TableRowList[];
  thirdRowHeader: String;
}

export default function APITable({
  firstRowData,
  firstRowHeader,
  secondRowData,
  secondRowHeader,
  thirdRowData,
  thirdRowHeader,
}: APITableProps) {
  const rowElements: any = [];
  let headerText: String;
  let categoryList: any;

  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      headerText = firstRowHeader;
      categoryList = firstRowData;
    } else if (i === 1) {
      headerText = secondRowHeader;
      categoryList = secondRowData;
    } else {
      headerText = thirdRowHeader;
      categoryList = thirdRowData;
    }
    let headerRowSpan = 0;
    if (categoryList.length > 0) {
      categoryList.forEach((data: any) => {
        headerRowSpan += data.function.length;
      });
    }

    categoryList.forEach((data: any, index: number) => {
      let categoryText: String = data.category;
      let functionList = data.function;
      functionList.forEach((data: any, index2: number) => {
        let functionText: String = data.data;
        if (index === 0 && index2 === 0) {
          rowElements.push(
            <tr
              key={i}
              className="font-lato text-base font-normal leading-normal tracking-normal"
            >
              <td
                rowSpan={headerRowSpan}
                className="box-border w-[20.625rem] bg-[#062F4B] px-[1.063rem] py-[1.313rem] text-[1.5rem] font-bold text-[#C3F0FF]"
              >
                {headerText}
              </td>
              <td
                rowSpan={functionList.length}
                className="box-border w-[20.625rem] bg-[#125177] px-[1.063rem] py-[1.313rem] text-[1.125rem] font-bold text-[#C3F0FF]"
              >
                {categoryText}
              </td>
              <td className="box-border w-[20.625rem] bg-[#E3FAFF] px-[1.063rem] py-[1.313rem] text-[1.125rem] font-bold leading-[1.625rem] text-[#18335E]">
                {functionText}
              </td>
            </tr>,
          );
        } else if (index > 0 && index2 === 0) {
          rowElements.push(
            <tr
              key={index}
              className="font-lato text-base font-normal leading-normal tracking-normal"
            >
              <td
                rowSpan={functionList.length}
                className="box-border w-[20.625rem] bg-[#125177] px-[1.063rem] py-[1.313rem] text-[1.125rem] font-bold text-[#C3F0FF]"
              >
                {categoryText}
              </td>
              <td className="box-border w-[20.625rem] bg-[#E3FAFF] px-[1.063rem] py-[1.313rem] text-[1.125rem] font-bold leading-[1.625rem] text-[#18335E]">
                {functionText}
              </td>
            </tr>,
          );
        } else {
          rowElements.push(
            <tr
              key={index2}
              className="font-lato text-base font-normal leading-normal tracking-normal"
            >
              <td className="box-border w-[20.625rem] bg-[#E3FAFF] px-[1.063rem] py-[1.313rem] text-[1.125rem] font-bold leading-[1.625rem] text-[#18335E]">
                {functionText}
              </td>
            </tr>,
          );
        }
      });
    });
  }

  return (
    <table className="box-border table-auto border-collapse border-separate border-gray-400">
      <tbody className="table-row-group border-current align-middle">
        {rowElements}
      </tbody>
    </table>
  );
}
