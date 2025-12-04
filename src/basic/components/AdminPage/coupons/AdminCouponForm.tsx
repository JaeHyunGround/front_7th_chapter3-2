import { useState } from "react";
import { Coupon } from "../../../types/types";

interface AdminCouponFormProps {
  addCoupon: (newCoupon: Coupon) => void;
  setShowCouponForm: React.Dispatch<React.SetStateAction<boolean>>;
  addNotification: (
    message: string,
    type?: "error" | "success" | "warning"
  ) => void;
}

const AdminCouponForm = ({
  addCoupon,
  setShowCouponForm,
  addNotification,
}: AdminCouponFormProps) => {
  const [couponForm, setCouponForm] = useState({
    name: "",
    code: "",
    discountType: "amount" as "amount" | "percentage",
    discountValue: 0,
  });

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon(couponForm);
    setCouponForm({
      name: "",
      code: "",
      discountType: "amount",
      discountValue: 0,
    });
    setShowCouponForm(false);
  };

  const handleCouponName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponForm({
      ...couponForm,
      name: e.target.value,
    });
  };

  const handleCouponCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponForm({
      ...couponForm,
      code: e.target.value.toUpperCase(),
    });
  };

  const handleDiscountType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCouponForm({
      ...couponForm,
      discountType: e.target.value as "amount" | "percentage",
    });
  };

  const handleDiscountValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCouponForm({
        ...couponForm,
        discountValue: value === "" ? 0 : parseInt(value),
      });
    }
  };

  const handleDiscountBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (couponForm.discountType === "percentage") {
      if (value > 100) {
        addNotification("할인율은 100%를 초과할 수 없습니다", "error");
        setCouponForm({
          ...couponForm,
          discountValue: 100,
        });
      } else if (value < 0) {
        setCouponForm({
          ...couponForm,
          discountValue: 0,
        });
      }
    } else {
      if (value > 100000) {
        addNotification("할인 금액은 100,000원을 초과할 수 없습니다", "error");
        setCouponForm({
          ...couponForm,
          discountValue: 100000,
        });
      } else if (value < 0) {
        setCouponForm({
          ...couponForm,
          discountValue: 0,
        });
      }
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <form onSubmit={handleCouponSubmit} className="space-y-4">
        <h3 className="text-md font-medium text-gray-900">새 쿠폰 생성</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              쿠폰명
            </label>
            <input
              type="text"
              value={couponForm.name}
              onChange={handleCouponName}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 border text-sm"
              placeholder="신규 가입 쿠폰"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              쿠폰 코드
            </label>
            <input
              type="text"
              value={couponForm.code}
              onChange={handleCouponCode}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 border text-sm font-mono"
              placeholder="WELCOME2024"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              할인 타입
            </label>
            <select
              value={couponForm.discountType}
              onChange={handleDiscountType}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 border text-sm"
            >
              <option value="amount">정액 할인</option>
              <option value="percentage">정률 할인</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {couponForm.discountType === "amount" ? "할인 금액" : "할인율(%)"}
            </label>
            <input
              type="text"
              value={
                couponForm.discountValue === 0 ? "" : couponForm.discountValue
              }
              onChange={handleDiscountValue}
              onBlur={handleDiscountBlur}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 border text-sm"
              placeholder={couponForm.discountType === "amount" ? "5000" : "10"}
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowCouponForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            쿠폰 생성
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCouponForm;
