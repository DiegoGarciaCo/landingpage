export function TrustIndicators() {
  return (
    <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            500+
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Happy Homeowners
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            15+
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Years Experience
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            $100M+
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            In Sales Volume
          </div>
        </div>
      </div>
    </div>
  );
}

