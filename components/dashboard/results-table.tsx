import { useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  CheckCircle2,
  XCircle,
  Search,
  BarChart3,
  TrendingUp,
  ListFilter,
} from "lucide-react";

import { VerificationResult } from "@/hooks/use-email-verification";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ResultsTableProps {
  results: VerificationResult[];
}

type FilterType = "all" | "valid" | "invalid";
export function ResultsTable({ results }: ResultsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterType>("all");

  // Calculate stats
  const validCount = results.filter(
    (r) => r.status === "exists" || r.status === "valid",
  ).length;
  const invalidCount = results.length - validCount;
  const validPercentage =
    results.length > 0 ? (validCount / results.length) * 100 : 0;

  // Filter results based on search and status
  const filteredResults = results.filter((result) => {
    const matchesSearch = result.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "valid" &&
        (result.status === "exists" || result.status === "valid")) ||
      (statusFilter === "invalid" &&
        result.status !== "exists" &&
        result.status !== "valid");

    return matchesSearch && matchesStatus;
  });

  const handleDownloadCSV = () => {
    if (filteredResults.length === 0) {
      return;
    }

    // Create CSV content from filtered results
    const headers = ["Email", "Status", "Message"];
    const csvContent = [
      headers.join(","),
      ...filteredResults.map((result) =>
        [
          result.email,
          result.status,
          `"${result.message?.replace(/"/g, '""') || ""}"`,
        ].join(","),
      ),
    ].join("\n");

    // Create filename based on active filter
    const filterSuffix = statusFilter !== "all" ? `-${statusFilter}` : "";
    const filename = `email-verification-results${filterSuffix}-${Date.now()}.csv`;

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (results.length === 0) {
    return (
      <Card className="border-border/50 shadow-lg backdrop-blur-sm">
        <div className="p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] shadow-md">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl">Verification Results</h3>
              <p className="text-muted-foreground text-sm">
                Your verification results will appear here
              </p>
            </div>
          </div>

          <div className="py-16 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="from-secondary to-secondary/50 mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br"
            >
              <CheckCircle2 className="text-muted-foreground h-12 w-12" />
            </motion.div>
            <p className="text-muted-foreground mb-2 text-lg">No results yet</p>
            <p className="text-muted-foreground text-sm">
              Start verifying emails to see results here
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-lg backdrop-blur-sm">
      <div className="space-y-6 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] shadow-md">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl">Verification Results</h3>
            <p className="text-muted-foreground text-sm">
              {filteredResults.length} of {results.length} email
              {results.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Stats Cards - Non-clickable, pure info display */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Card */}
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:border-blue-800 dark:from-blue-950/30 dark:to-cyan-950/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-blue-600 dark:text-blue-400">
                  Total Verified
                </p>
                <p className="text-3xl text-blue-900 dark:text-blue-100">
                  {results.length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          {/* Valid Card */}
          <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-green-600 dark:text-green-400">
                  Valid Emails
                </p>
                <p className="text-3xl text-green-900 dark:text-green-100">
                  {validCount}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </div>

          {/* Invalid Card */}
          <div className="rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-4 dark:border-red-800 dark:from-red-950/30 dark:to-rose-950/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-red-600 dark:text-red-400">
                  Invalid Emails
                </p>
                <p className="text-3xl text-red-900 dark:text-red-100">
                  {invalidCount}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filter Tabs with Download Button */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ListFilter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter:</span>
            </div>
            <div className="bg-secondary/50 inline-flex rounded-lg p-1">
              <Button
                variant={statusFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className={`relative ${
                  statusFilter === "all"
                    ? "bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white hover:from-[#0ea573] hover:to-[#0599b8]"
                    : "hover:bg-secondary"
                }`}
              >
                All
                <Badge
                  variant="secondary"
                  className={`ml-2 ${
                    statusFilter === "all"
                      ? "bg-white/20 text-white hover:bg-white/20"
                      : ""
                  }`}
                >
                  {results.length}
                </Badge>
              </Button>
              <Button
                variant={statusFilter === "valid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter("valid")}
                className={`relative ${
                  statusFilter === "valid"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "hover:bg-secondary"
                }`}
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                Valid
                <Badge
                  variant="secondary"
                  className={`ml-2 ${
                    statusFilter === "valid"
                      ? "bg-white/20 text-white hover:bg-white/20"
                      : ""
                  }`}
                >
                  {validCount}
                </Badge>
              </Button>
              <Button
                variant={statusFilter === "invalid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setStatusFilter("invalid")}
                className={`relative ${
                  statusFilter === "invalid"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "hover:bg-secondary"
                }`}
              >
                <XCircle className="mr-1.5 h-3.5 w-3.5" />
                Invalid
                <Badge
                  variant="secondary"
                  className={`ml-2 ${
                    statusFilter === "invalid"
                      ? "bg-white/20 text-white hover:bg-white/20"
                      : ""
                  }`}
                >
                  {invalidCount}
                </Badge>
              </Button>
            </div>
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownloadCSV}
            disabled={filteredResults.length === 0}
            variant="outline"
            size="sm"
            className="gap-2 transition-all hover:bg-gradient-to-r hover:from-[#10b981]/10 hover:to-[#06b6d4]/10 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </div>

        {/* Search */}
        <div className="group relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 transition-colors group-focus-within:text-[#06b6d4]" />
          <Input
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary/50 border-border/50 h-11 pl-10 transition-all focus:border-[#06b6d4]/50 focus:ring-[#06b6d4]/20"
          />
        </div>

        {/* Table */}
        <div className="border-border/50 bg-card overflow-hidden rounded-xl border">
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader className="bg-secondary/80 sticky top-0 z-10 backdrop-blur-sm">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-12">Email</TableHead>
                  <TableHead className="h-12">Status</TableHead>
                  <TableHead className="h-12">Message</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredResults.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-muted-foreground py-8 text-center"
                    >
                      {searchQuery || statusFilter !== "all"
                        ? "No results found for current filters"
                        : "No results found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResults.map((result, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(index * 0.05, 0.5),
                      }}
                      className="border-border/50 hover:bg-secondary/30 border-b transition-colors"
                    >
                      {/* Email */}
                      <TableCell className="py-4 font-mono text-sm">
                        {result.email}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4">
                        {result.status === "exists" ||
                        result.status === "valid" ? (
                          <Badge className="gap-1.5 border-green-200 bg-green-100 text-green-800 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/30">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Valid
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1.5">
                            <XCircle className="h-3.5 w-3.5" />
                            Invalid
                          </Badge>
                        )}
                      </TableCell>

                      {/* Message */}
                      <TableCell className="text-muted-foreground max-w-xs py-4 text-sm">
                        {result.message ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p
                                  className="cursor-help truncate"
                                  title={result.message}
                                >
                                  {result.message}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs break-words">
                                <p>{result.message}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Success Rate */}
        {results.length > 0 && (
          <div className="from-secondary/50 to-secondary/30 border-border/50 flex items-center gap-3 rounded-xl border bg-gradient-to-r p-4">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm font-semibold">
                  {validPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="bg-secondary h-2.5 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#10b981] to-[#06b6d4]"
                  initial={{ width: 0 }}
                  animate={{ width: `${validPercentage}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
