import React from 'react';

const ReservationSidebar: React.FC = () => {
  // 임의 값 설정
  const nights = 3;
  const price_per_night = 120000; // 1박당 12만 원
  const fee = 15000;
  const totalPrice = price_per_night * nights + fee;

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">1박 요금</h2>

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">인원</label>

        <select className="w-full -ml-1 text-sm">
          <option value="1">1명</option>
          <option value="2">2명</option>
          <option value="3">3명</option>
          <option value="4">4명</option>
          <option value="5">5명</option>
        </select>
      </div>

      <div className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl cursor-pointer">
        예약하기
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p>* {nights}박</p>
        <p>{(price_per_night * nights).toLocaleString()}원</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p>서비스 수수료</p>
        <p>{fee.toLocaleString()}원</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between items-center font-bold">
        <p>총 합계</p>
        <p>{totalPrice.toLocaleString()}원</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
