export default function AboutScreen() {
  return (
    <div className="flex flex-col justify-center mt-[14px] bg-[#F7FBF7]">
      <div className="grid grid-cols-4 mx-[35px]">
        <div className="grid grid-rows-2 place-items-center mr-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg">
            <h5 className="text-[20px] text-primary-800 font-semibold">20</h5>
          </div>

          <p className="text-[8px] -mt-[.5rem] text-secondary-700 font-semibold text-center">
            Jumlah Instansi
          </p>
        </div>

        <div className="grid grid-rows-2 place-items-center mx-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg">
            <h5 className="text-[20px] text-primary-800 font-semibold">48</h5>
          </div>

          <p className="text-[8px] -mt-[.5rem] text-secondary-700 font-semibold text-center">
            Jumlah Layanan
          </p>
        </div>

        <div className="grid grid-rows-2 place-items-center mx-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg">
            <h5 className="text-[20px] text-primary-800 font-semibold">18</h5>
          </div>

          <p className="text-[8px] -mt-[.5rem] text-secondary-700 font-semibold text-center">
            Antrian Hari ini
          </p>
        </div>

        <div className="grid grid-rows-2 place-items-center ml-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg">
            <h5 className="text-[20px] text-primary-800 font-semibold">16</h5>
          </div>

          <p className="text-[8px] -mt-[.5rem] text-secondary-700 font-semibold text-center">
            Permohonan Hari ini
          </p>
        </div>
      </div>

      <div className="grid grid-rows-1 mt-[28px] space-y-4 mx-[30px]">
        <h3 className="text-center text-[16px] text-primary-800 font-semibold">
          Tentang Mal Pelayanan Publik
        </h3>

        <p className="text-[10px] text-neutral-800 font-normal text-justify">
          Lorem ipsum dolor sit amet consectetur. Tincidunt fermentum in neque
          malesuada feugiat. Integer volutpat odio nisl dictumst. In lobortis
          sodales ipsum facilisis in faucibus eu. Cras senectus dictum eget
          maecenas libero dictum elementum. Amet nulla natoque aenean ultrices
          iaculis. Ut eget volutpat massa diam tempus risus netus. Accumsan
          vitae egestas porta commodo imperdiet imperdiet aenean. Eu ut bibendum
          nulla netus diam eu. Ultricies arcu sit tincidunt leo nisl etiam nec
          arcu. Vestibulum potenti tempus sapien scelerisque magna posuere at.
          Sed iaculis elit quam enim nisl ullamcorper non sit eget. Quisque
          adipiscing quam metus sit pharetra suspendisse neque congue lacus.
          Nullam neque dolor diam vel etiam urna. Mauris in diam ac turpis nisl.
          Consequat et urna eleifend nec. Sed morbi vehicula egestas elementum
          sed neque in tellus nulla. Enim sed massa ut quis velit ornare vel
          urna. Ut vitae egestas integer egestas. Viverra erat praesent faucibus
          sodales. Tempus sit purus convallis ipsum faucibus mollis fermentum.
          Nunc mi pellentesque facilisis interdum. Malesuada non id porta lorem.
          Urna tellus ornare morbi turpis risus non.
        </p>
      </div>
    </div>
  );
}
