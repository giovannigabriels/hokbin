export default function Carousel() {
  return (
    <div className="carousel w-3/4 m-auto">
      <div
        id="slide1"
        className="carousel-item relative w-full">
        <img
          src="https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/660563039c8df00662a300e6e3b3084b-1664558013106"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide4"
            className="btn btn-circle">
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide2"
        className="carousel-item relative w-full">
        <img
          src="https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/711eb2845309fb5d2a30ba308c8d8a5f-1660125030047"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide1"
            className="btn btn-circle">
            ❮
          </a>
          <a
            href="#slide3"
            className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide3"
        className="carousel-item relative w-full">
        <img
          src="https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/c4b37a644132677dfd1f4f1126805a78-1660125200083"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide2"
            className="btn btn-circle">
            ❮
          </a>
          <a
            href="#slide4"
            className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide4"
        className="carousel-item relative w-full">
        <img
          src="https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/ae37f388c1ffa5c88c47898920163e58-1664558041321"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide3"
            className="btn btn-circle">
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}
