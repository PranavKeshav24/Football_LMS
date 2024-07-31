export default function AboutUs() {
  return (
    <div className="w-full bg-background">
      <section className="container mx-auto pb-12 md:pb-20 lg:pb-28">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="mb-12 md:mb-16 lg:mb-20 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Meet the Team
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              The developers behind the Football League Management System
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 md:h-56 lg:h-64 flex items-center justify-center bg-primary -foreground text-6xl font-bold">
                1
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold ">
                  Pranav Keshav
                </h3>
                <p className="mt-2 text-muted-foreground">1RN22IS111</p>
                <p className="mt-4 text-muted-foreground">
                  Pranav Keshav (1RN22IS111) was instrumental in designing the
                  database and writing the APIs for the Football League
                  Management System. He also contributed to the frontend
                  development, ensuring a seamless user experience.
                </p>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 md:h-56 lg:h-64 flex items-center justify-center bg-primary -foreground text-6xl font-bold">
                2
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold ">
                  Pratith Bhat V
                </h3>
                <p className="mt-2 text-muted-foreground">1RN22IS112</p>
                <p className="mt-4 text-muted-foreground">
                  Pratith Bhat V (1RN22IS112) played a key role in defining the
                  schema and establishing entity relationships for the Football
                  League Management System. He also contributed to the frontend
                  development, creating an intuitive and visually appealing user
                  interface.
                </p>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 md:h-56 lg:h-64 flex items-center justify-center bg-primary -foreground text-6xl font-bold">
                3
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold ">
                  Pavan Kumar H
                </h3>
                <p className="mt-2 text-muted-foreground">1RN22IS102</p>
                <p className="mt-4 text-muted-foreground">
                  Pavan Kumar H (1RN22IS102) was essential in designing the
                  schema and establishing entity relationships for the Football
                  League Management System. He also assisted with the frontend
                  development, enhancing the overall user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
