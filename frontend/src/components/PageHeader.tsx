interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 lg:py-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 sm:gap-3">{children}</div>
      )}
    </div>
  );
}

export default PageHeader;
