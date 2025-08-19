import React from 'react';
import { BuildingIcon, UploadIcon, ArrowRightIcon, ScanIcon, FileTextIcon, UserIcon } from 'lucide-react';
interface DataImportOptionsProps {
  onSelectMethod: (method: 'base' | 'upload') => void;
}
export function DataImportOptions({
  onSelectMethod
}: DataImportOptionsProps) {
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          Let's make the registration process easier by importing your data.
          Choose one of the options below to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectMethod('base')}>
          <div className="flex flex-col items-center text-center p-4">
            <BuildingIcon className="h-16 w-16 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Import from Base Company
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              We'll use information from your existing company profile to
              pre-fill the registration forms.
            </p>
            <ul className="text-sm text-gray-600 text-left space-y-2 mb-6 w-full">
              <li className="flex items-start">
                <FileTextIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Company details automatically imported</span>
              </li>
              <li className="flex items-start">
                <UserIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Directors and shareholders information pre-filled</span>
              </li>
              <li className="flex items-start">
                <ScanIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Faster registration process</span>
              </li>
            </ul>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center">
              Import from Base Company
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectMethod('upload')}>
          <div className="flex flex-col items-center text-center p-4">
            <UploadIcon className="h-16 w-16 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Documents
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload key documents and we'll extract the information to help
              pre-fill your registration forms.
            </p>
            <ul className="text-sm text-gray-600 text-left space-y-2 mb-6 w-full">
              <li className="flex items-start">
                <FileTextIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Upload passport copies</span>
              </li>
              <li className="flex items-start">
                <FileTextIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Upload company extract</span>
              </li>
              <li className="flex items-start">
                <ScanIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>AI-powered data extraction</span>
              </li>
            </ul>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center">
              Upload Documents
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>;
}