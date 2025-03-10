import { Request, Response, NextFunction } from 'express';

import { appError, getEntity } from '../../../../utils';
import { IFCarDetail } from '../../../../domain/interfaces';

/**
 * Create comment
 */
export const productDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@todo: Checking the getting shortURL
    const shortUrl = req.params.shortUrl.split('.')[0];

    //@todo: Validating the shortUrl

    const carDetails: IFCarDetail[] = getEntity('car-detail');
    const carFound: IFCarDetail[] = carDetails.filter((car) => {
      return car.shortUrl === shortUrl;
    });
    const header = getEntity('header');
    const footer = getEntity('footer');
    const cities = getEntity('cities');

    return res.render('product-detail', {
      data: {
        titlePage: "Sản phẩm | " + carFound[0].name,
        cities,
        breadcrumb: [
          {
            name: 'Trang chủ',
            link: '/'
          },
          {
            name: 'Sản phẩm',
            link: '/san-pham.html'
          },
          {
            name: carFound[0].name
          }
        ],
        carData: carFound[0],
      },
      header,
      footer
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};
