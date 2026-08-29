type PageHeaderProps = {
    title: string;
    description?: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="space-y-1.5">
            <h1 className="text-xl font-heading text-primary md:text-2xl">{title}</h1>
            {description && (
                <p className="text-sm text-muted-foreground md:text-base">{description}</p>
            )}
        </div>
    );
}

export default PageHeader;
