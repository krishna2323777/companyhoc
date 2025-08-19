import React from 'react';
import { CheckIcon, InfoIcon, FileTextIcon, UserIcon, BuildingIcon, RocketIcon, DownloadIcon, UploadIcon, ArrowRightIcon } from 'lucide-react';
interface RequirementsOverviewProps {
  onContinue: () => void;
  onSelectImportMethod: (method: 'target' | 'base' | 'upload') => void;
}
export function RequirementsOverview({
  onContinue,
  onSelectImportMethod
}: RequirementsOverviewProps) {
  const requirements = [{
    id: 'doc1',
    title: 'Valid passport copies',
    description: 'For all directors and UBOs (Ultimate Beneficial Owners)',
    icon: <UserIcon className="h-5 w-5 text-blue-600" />
  }, {
    id: 'doc2',
    title: 'Proof of address',
    description: 'Recent utility bill or bank statement (less than 3 months old)',
    icon: <FileTextIcon className="h-5 w-5 text-blue-600" />
  }, {
    id: 'doc3',
    title: 'Company structure',
    description: 'Details of shareholders and their ownership percentages',
    icon: <BuildingIcon className="h-5 w-5 text-blue-600" />
  }, {
    id: 'doc4',
    title: 'Business plan',
    description: 'Brief description of business activities and goals (optional but recommended)',
    icon: <FileTextIcon className="h-5 w-5 text-blue-600" />
  }, {
    id: 'doc5',
    title: 'Initial share capital',
    description: 'Minimum €0.01, typically €100 divided into shares',
    icon: <FileTextIcon className="h-5 w-5 text-blue-600" />
  }];
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex">
          <InfoIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Dutch BV Registration Requirements
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Before proceeding with your Dutch BV registration, please ensure
              you have the following documents and information ready.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex">
          <RocketIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              eBranch Plan Required
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Dutch BV registration requires an active eBranch plan. Your
              current plan status is confirmed.
            </p>
            <div className="flex items-center mt-2">
              <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                <CheckIcon className="h-3 w-3 mr-1" />
                eBranch Plan Active
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {requirements.map(req => <div key={req.id} className="flex items-start p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex-shrink-0 mt-0.5">{req.icon}</div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">{req.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{req.description}</p>
            </div>
          </div>)}
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Import Company Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose an option to import company information and personnel details
          to speed up your registration process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectImportMethod('target')}>
            <div className="flex flex-col items-center text-center p-4">
              <BuildingIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h4 className="text-sm font-medium text-gray-900">
                Import from Target Company
              </h4>
              <p className="text-xs text-gray-500 mt-2">
                Use information from your existing Dutch market presence
              </p>
              <button className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                Select
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectImportMethod('base')}>
            <div className="flex flex-col items-center text-center p-4">
              <DownloadIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h4 className="text-sm font-medium text-gray-900">
                Import from Base Company
              </h4>
              <p className="text-xs text-gray-500 mt-2">
                Use directors and shareholders from your base company profile
              </p>
              <button className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                Select
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => onSelectImportMethod('upload')}>
            <div className="flex flex-col items-center text-center p-4">
              <UploadIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h4 className="text-sm font-medium text-gray-900">
                Upload Documents
              </h4>
              <p className="text-xs text-gray-500 mt-2">
                Upload passport copies to extract information automatically
              </p>
              <button className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                Select
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Timeline Overview
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-600">
            <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
            <span>Registration details submission (Today)</span>
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
            <span>Document verification (1-2 business days)</span>
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
            <span>Notary preparation (2-3 business days)</span>
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
            <span>Company registration (1-2 business days)</span>
          </li>
        </ul>
      </div>
      <div className="flex justify-end pt-4">
        <button onClick={onContinue} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
          Continue to Registration
        </button>
      </div>
    </div>;
}