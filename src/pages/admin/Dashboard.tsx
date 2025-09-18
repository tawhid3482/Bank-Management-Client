"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useAdminStatsQuery,
  useGetAllInfoQuery,
} from "@/redux/features/info/info.api";
import { Users, Filter, Eye, X, Clock, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const Dashboard = () => {
  const { data } = useGetAllInfoQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const info = data?.data || [];

  const { data: stats } = useAdminStatsQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const clients = stats?.data || {};

  // Filter state
  const [filter, setFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");

  // Toggle state for filter form
  const [showFilters, setShowFilters] = useState(false);

  // Filter form values
  const [filterValues, setFilterValues] = useState({
    city: "",
    minScore: "",
    maxScore: "",
    minIncome: "",
    status: "",
  });

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => setSelectedClientId(null);

  // Filtered clients
  const filteredClients = info.filter((client: any) => {
    const matchesStatus = filter === "all" ? true : client.status === filter;
    const matchesCity = filterValues.city
      ? client.contact?.city
          ?.toLowerCase()
          .includes(filterValues.city.toLowerCase())
      : true;
    const creditScore = parseFloat(client.creditScore);
    const minScore = parseFloat(filterValues.minScore || "0");
    const maxScore = parseFloat(filterValues.maxScore || "100");
    const matchesScore = creditScore >= minScore && creditScore <= maxScore;
    const annualIncome = parseFloat(client.annualInfo?.annualIncome || "0");
    const minIncome = parseFloat(filterValues.minIncome || "0");
    const matchesIncome = annualIncome >= minIncome;
    const matchesStatusFilter = filterValues.status
      ? client.status === filterValues.status
      : true;

    return (
      matchesStatus &&
      matchesCity &&
      matchesScore &&
      matchesIncome &&
      matchesStatusFilter
    );
  });

  // Count values
  const totalClient = clients?.totalCount || 0;
  const approved = clients?.approvedCount || 0;
  const pending = clients?.pendingCount || 0;
  const rejected = clients?.rejectedCount || 0;

  return (
    <div className="space-y-8 relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 text-3xl font-bold text-gray-800"
      >
        CreditFrist - Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div whileHover={{ scale: 1.05 }}>
          <div className="flex items-center space-x-4 rounded-lg p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4B1E2F33] text-gray-700 ">
              <Users size={24} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-gray-500">Total Clients</p>
              <p className="text-2xl font-bold">{totalClient}</p>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <div className="flex items-center space-x-4 rounded-lg p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#039B0633] text-gray-700">
              <BadgeCheck size={24} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-gray-500">Approved Clients</p>
              <p className="text-2xl font-bold">{approved}</p>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <div className="flex items-center space-x-4 rounded-lg p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0AB0B33] text-gray-700">
              <Clock size={24} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-gray-500">Pending Clients</p>
              <p className="text-2xl font-bold">{pending}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Client List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Client List
            </h2>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filters</span>
            </Button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-10 justify-start border-b border-gray-200 pb-2">
            {[
              {
                key: "all",
                label: "All Clients",
                count: totalClient,
                bg: "bg-[#28282833]",
              },
              {
                key: "pending",
                label: "Pending",
                count: pending,
                bg: "bg-[#E0AB0B33]",
              },
              {
                key: "approved",
                label: "Approved",
                count: approved,
                bg: "bg-[#039B0633]",
              },
              {
                key: "rejected",
                label: "Rejected",
                count: rejected,
                bg: "bg-[#D0020233]",
              },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key as any)}
                className={`relative pb-2 text-sm font-medium flex items-center gap-2 ${
                  filter === btn.key
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {btn.label}
                <span
                  className={`rounded-full px-2 text-xs font-semibold ${btn.bg}`}
                >
                  {btn.count}
                </span>
              </button>
            ))}
          </div>

          {/* Toggle Filter Form */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={filterValues.city}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 bg-gray-200 mt-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Min Score</label>
                <input
                  type="number"
                  name="minScore"
                  value={filterValues.minScore}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded p-2 bg-gray-200 mt-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Max Score</label>
                <input
                  type="number"
                  name="maxScore"
                  value={filterValues.maxScore}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded p-2 bg-gray-200 mt-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Annual Income ($)
                </label>
                <input
                  type="number"
                  name="minIncome"
                  value={filterValues.minIncome}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded p-2 bg-gray-200 mt-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select
                  name="status"
                  value={filterValues.status}
                  onChange={handleInputChange}
                  className="w-full border-2 rounded p-2 bg-gray-200 mt-2"
                >
                  <option value="">All</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          )}

          {/* Responsive Table */}
          {/* Responsive Table */}
          <div className="mt-6">
            {filteredClients?.length > 0 ? (
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500">
                        ID
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500">
                        City
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500">
                        Credit Score
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500">
                        Amount Requested
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredClients.map((client: any, idx: number) => (
                      <motion.tr
                        key={client._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <td className="whitespace-nowrap px-4 sm:px-6 py-4 font-medium text-gray-900">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-gray-500">
                          {client.contact?.city || "-"}
                        </td>
                        <td
                          className={`whitespace-nowrap px-4 sm:px-6 py-4 ${
                            parseFloat(client.creditScore) >= 70
                              ? "text-green-600"
                              : parseFloat(client.creditScore) >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {client.creditScore}
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-gray-500">
                          ${client.requestLoanAmount}
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              client.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : client.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-gray-500">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedClientId(client._id)}
                          >
                            <Eye size={18} />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6">
                No Clients Found
              </div>
            )}

            {/* Small Screen: Vertical Cards */}
            <div className="sm:hidden flex flex-col gap-4">
              {filteredClients?.map((client: any, idx: number) => (
                <motion.div
                  key={client._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-300 pb-4"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900">ID:</span>
                    <span>{idx + 1}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900">City:</span>
                    <span>{client.contact?.city || "-"}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900">
                      Credit Score:
                    </span>
                    <span
                      className={`${
                        parseFloat(client.creditScore) >= 70
                          ? "text-green-600"
                          : parseFloat(client.creditScore) >= 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {client.creditScore}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900">Amount:</span>
                    <span>${client.requestLoanAmount}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900">Status:</span>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        client.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : client.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedClientId(client._id)}
                    >
                      <Eye size={18} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {selectedClientId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-6xl mx-auto  max-h-screen overflow-y-auto p-6">
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-white hover:text-gray-700"
              onClick={closeModal}
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <Modal infoId={selectedClientId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
