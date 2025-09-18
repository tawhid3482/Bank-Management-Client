/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartSpline } from "lucide-react";
import ProgressBar from "../Profile/ProgressBar";

interface InfoProps  {
  info:any
}

const RightColumn = ({info}:InfoProps) => {
    return (
        <div>
              {/* Credit Score */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Credit Score</h2>
              <div className="flex justify-center mb-4">
                <ProgressBar value={Number(info?.creditScore)} />
              </div>
              <div className="text-sm my-8 space-y-2">
                <div>
                  <div className="flex justify-between">
                    <span>Annual Income (FCFA)</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>Electricity Bill (FCFA)</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>Mobile money Balance (FCFA)</span>
                    <span>70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-sm space-y-2">
                <p className="my-2">
                  <strong>Request Loan:</strong> {info?.requestLoanAmount}
                </p>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Risk Assessment</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Debt-to-Income Ratio:</strong>{" "}
                  {info?.debtToIncomeRatio}
                </p>
                <p>
                  <strong>Monthly Income:</strong> {info?.monthlyIncome}
                </p>
                <p>
                  <strong>Total Debt:</strong> {info?.totalDebt}
                </p>

                <div className="flex items-center gap-2 md:mt-20">
                  <ChartSpline size={16} />
                  <p>
                    <strong>Overall Risk:</strong>{" "}
                    <span className="text-green-600 font-bold">Low</span>
                  </p>
                </div>
              </div>
            </div>
        </div>
    );
};

export default RightColumn;