import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    private locationRespository: Repository<Location>
  ){}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRespository.save(createLocationDto);
  }

  findAll() {
    return this.locationRespository.find();
  }

  findOne(id: number) {
    const location = this.locationRespository.findOneBy({
      locationId: id,
    })
    if (!location) throw new NotFoundException("Location not found")
    return location;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = this.locationRespository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    return location;
  }

  remove(id: number) {
    return this.locationRespository.delete({
      locationId: id,
    })
  }
}
