export default function SampleHeader(props: { sampleName:string, sampleIcon:string, sampleDocsLink:string }) {
  return (
    <div className="flex flex-row justify-between items-center gap-6 w-[752px]">
      <div className="flex flex-row justify-start items-center gap-6 w-[480px]">
        <div className="flex flex-row justify-center items-center pt-3 pr-3 pb-3 pl-3 rounded-xl border h-16 bg-gradient-to-br from-[rgba(255,255,255,1)] from-29% to-[rgba(248,250,252,1)] to-134%">
          <div className="flex flex-col justify-center items-center h-10">
            <img width="37.9px" height="31.3px" src={ "/assets/" + props.sampleIcon} alt={props.sampleName} />
          </div>
        </div>
        <div className="font-manrope text-[18px] min-w-[152px] whitespace-nowrap text-black text-opacity-100 leading-6 font-medium">
          {props.sampleName}
        </div>
      </div>
      <div className="flex justify-between items-center gap-1 rounded-md w-[84px] h-5 overflow-hidden">
        <a href={props.sampleDocsLink} target="_blank">
          <div className="font-manrope text-sm min-w-[64px] whitespace-nowrap text-sky-600 text-opacity-100 leading-5 font-medium">
            View docs
          </div>
        </a>
        <a href={props.sampleDocsLink} target="_blank">
          <div className="flex flex-col justify-center items-center w-4 h-4">
            <img
              width="10.3px"
              height="7.2px"
              src="/assets/ExploreNow.svg"
              alt="Explore Now"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
