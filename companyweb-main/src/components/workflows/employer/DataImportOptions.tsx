import React from 'react';
import { BuildingIcon, DownloadIcon, UploadIcon, ArrowRightIcon } from 'lucide-react';
interface DataImportOptionsProps {
  onSelectMethod: (method: 'base' | 'upload' | 'target') => void;
}
export function DataImportOptions({
  onSelectMethod
}: DataImportOptionsProps) {
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          Choose how you want to import your company information for the
          employer registration process.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectMethod('target')}>
          <div className="flex flex-col items-center text-center">
            <BuildingIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Target Company
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Import data from your existing Dutch entity
            </p>
            <button className="mt-2 flex items-center text-blue-600 text-sm font-medium">
              Select
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectMethod('base')}>
          <div className="flex flex-col items-center text-center">
            <DownloadIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Base Company
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Import data from your home country company
            </p>
            <button className="mt-2 flex items-center text-blue-600 text-sm font-medium">
              Select
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectMethod('upload')}>
          <div className="flex flex-col items-center text-center">
            <UploadIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Document Upload
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload documents to extract information automatically
            </p>
            <button className="mt-2 flex items-center text-blue-600 text-sm font-medium">
              Select
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>;
}