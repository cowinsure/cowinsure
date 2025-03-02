// components/Loader.tsx
export default function Loader() {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="spinner-border animate-spin w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full"></div>
      </div>
    );
  }