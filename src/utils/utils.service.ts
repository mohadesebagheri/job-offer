import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  transformData<T>(
    data: any,
    mapping: Record<string, any>,
    extraParams?: any,
  ): T {
    const transformed: any = {} as T;

    Object.entries(mapping).forEach(([dtoField, mapValue]) => {
      if (Array.isArray(mapValue)) {
        // ✅ Handle merging of multiple fields from the config
        transformed[dtoField] = mapValue
          .map((field) => this.getNestedValue(data, field))
          .filter((value) => value !== undefined && value !== null)
          .join(', ');
      } else if (typeof mapValue === 'string') {
        transformed[dtoField] = this.getNestedValue(data, mapValue);
      } else if (typeof mapValue === 'function') {
        transformed[dtoField] = mapValue(data, extraParams);
      } else if (typeof mapValue === 'object' && mapValue !== null) {
        transformed[dtoField] = this.transformData(data, mapValue, extraParams);
      }
    });

    return transformed;
  }

  getNestedValue(obj: any, path: string): any {
    return path
      .split('.')
      .reduce((o, key) => (o && typeof o === 'object' ? o[key] : null), obj);
  }
}
