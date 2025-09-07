type ErrorBannerProps = {
  message?: string;
};

export function ErrorBanner({
  message = "Something went wrong while loading artworks.",
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {message}
    </div>
  );
}

export default ErrorBanner;
