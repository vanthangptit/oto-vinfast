import { Request, Response, NextFunction } from 'express';
import { appError, getEntity } from '../../../../utils';
import { IFCar, IFCarDetail } from "../../../../domain/interfaces";

/**
 * Create comment
 */
export const homeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = getEntity('home');
    const header = getEntity('header');
    const footer = getEntity('footer');
    const cities = getEntity('cities');

    const cars: IFCar[] = getEntity('cars');
    const carDetails: IFCarDetail[] = getEntity('car-detail');
    const carItems = cars.map((car) => {
      return {
        carId: car.id,
        carName: car.name,
        items: carDetails.filter((detail) => {
          return detail.group === car.id;
        })
      }
    })

    return res.render('home', {
      data: {
        ...data,
        cities,
        productTypes: cars,
        productDiscount: carItems
      },
      header,
      footer
    });
  } catch (e: any) {
    return next(appError(e.message));
  }
};
