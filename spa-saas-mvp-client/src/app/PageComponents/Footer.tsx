function Footer() {

  return (
    <div
      className="flex justify-center items-center w-full h-[50px] bg-backgrounds border-t-[1px] border-t-borders"
    >
      <div className="relative flex justify-center items-center w-[80%] max-w-[1000px] text-headerFooterText">
        <p>© 2023 Bill Liang</p>
        <a href="https://loading.io/icon/" rel="noopener noreferrer">the loading indicator is provided by loading.io</a>
      </div>
    </div>
  )
}

export default Footer;