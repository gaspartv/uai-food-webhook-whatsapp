import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { catchError, lastValueFrom, of } from "rxjs";

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async post(url: string, data: any) {
    return await lastValueFrom(
      this.httpService.post(url, data).pipe(
        catchError((error) => {
          Logger.error(
            error.response?.data?.error?.message ||
              "An error occurred while sending the message",
            "Axios.post",
          );

          return of({
            success: false,
            message:
              error.response?.data?.error?.message ||
              "An error occurred while sending the message",
          });
        }),
      ),
    );
  }
}
