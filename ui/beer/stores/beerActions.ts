import * as axiosUtility from "../../utility/axiosInstance";

export const beerAction = {
  async requestBeerList(page: number = 1, perPage: number = 8): Promise<void> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res = await djangoAxiosInstance.get("/beer/list", {
        params: { page, perPage },
      });
      console.log("Response Data:", res.data);

      this.beerList = res.data.dataList;
      this.totalPages = res.data.totalPages;
      this.currentPage = page;
    } catch (error) {
      console.log("requestBeerList() 중 에러:", error);
    }
  },
  async requestCreateBeer(imageFormData: FormData): Promise<void> {
    console.log(`requestCreateBeer(): ${imageFormData}`);
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res = await djangoAxiosInstance.post(
        "/beer/create",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response Data:", res.data);
    } catch (error) {
      console.log("requestCreateBeer() 중 에러:", error);
    }
  },
  async requestBeerById(id: string): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res = await djangoAxiosInstance.get(`/beer/read/${id}`);
      console.log("Response Data:", res.data);
      return res.data;
    } catch (error) {
      console.log("requestBeerById() 중 에러:", error);
      throw error;
    }
  },
};
