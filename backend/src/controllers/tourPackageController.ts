// src/controllers/tourPackageController.ts
import { Request, Response } from "express";
import { prismaClient as prisma } from "../server";
import { Prisma } from "@prisma/client";

// Create a new tour package
export const createTourPackage = async (req: Request, res: Response) => {
    try {
        const {
            name,
            location,
            city,
            price,
            image,
            freeCancelationAvailable,
            tourCategoryId,
            startDate,
            endDate,
            accommodationDetails,
            activities,
            transportationDetails,
        } = req.body;
        const duration = Math.ceil(
            (new Date(String(endDate)).getTime() -
                new Date(String(startDate)).getTime()) /
                (1000 * 60 * 60 * 24)
        );
        const newTourPackage = await prisma.tourPackage.create({
            data: {
                name,
                location,
                city,
                price,
                image,
                freeCancelationAvailable,
                tourCategoryId,
                startDate,
                endDate,
                duration,
                accommodationDetails,
                activities,
                transportationDetails,
            },
        });
        res.status(201).json({
            message: "Tour package created successfully",
            data: newTourPackage,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create tour package" });
    }
};

// Get all tour packages with pagination, filtering, and sorting
export const getAllTourPackages = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            pageSize = 5,
            name,
            minPrice,
            maxPrice,
            city,
            sortBy = "name",
            sortOrder = "asc",
            freeCancelationAvailable,
            categories,
            startDate,
            endDate,
            minDuration,
            maxDuration,
        } = req.query;
        const categoriesArray = categories ? String(categories).split(",") : [];
        // const filters: Prisma.TourPackageWhereInput = {};
        const filters: any = {};
        if (name) {
            filters.name = { contains: String(name), mode: "insensitive" }; // Case insensitive search
        }
        if (minPrice) {
            filters.price = { gte: Number(minPrice) };
        }
        if (maxPrice) {
            if (!filters.price) {
                filters.price = {};
            }
            filters.price.lte = Number(maxPrice);
        }
        if (city) {
            filters.city = { contains: String(city), mode: "insensitive" }; // Case insensitive search
        }
        if (freeCancelationAvailable) {
            filters.freeCancelationAvailable =
                freeCancelationAvailable === "true";
        }
        if (categoriesArray.length > 0) {
            filters.tourCategoryId = {
                in: categoriesArray.map((category) => Number(category)),
            };
        }
        if (startDate && endDate) {
            filters.startDate = {
                gte: new Date(String(startDate)),
            };
            filters.endDate = {
                lte: new Date(String(endDate)),
            };
        }
        if (minDuration) {
            filters.duration = {
                gte: Number(minDuration),
            };
        }
        if (maxDuration) {
            if (!filters.duration) {
                filters.duration = {};
            }
            filters.duration.lte = Number(maxDuration);
        }

        const skip = (Number(page) - 1) * Number(pageSize);
        const take = Number(pageSize);

        const tourPackages = await prisma.tourPackage.findMany({
            where: filters,
            orderBy: { [String(sortBy)]: sortOrder === "asc" ? "asc" : "desc" },
            skip: skip,
            take: take,
        });
        const freeCancelationAvailableCount = await prisma.tourPackage.count({
            where: {
                ...filters,
                freeCancelationAvailable: true,
            },
        });

        const minPriceTourPackage = await prisma.tourPackage.findFirst({
            where: {
                city: filters.city,
            },
            orderBy: { price: "asc" },
        });
        const maxPriceTourPackage = await prisma.tourPackage.findFirst({
            where: {
                city: filters.city,
            },
            orderBy: { price: "desc" },
        });

        const total = await prisma.tourPackage.count({ where: filters });

        res.status(200).json({
            data: tourPackages,
            meta: {
                total,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages: Math.ceil(total / Number(pageSize)),
                freeCancelationAvailableCount,
                minPrice: minPriceTourPackage?.price || 0,
                maxPrice: maxPriceTourPackage?.price || 0,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve tour packages" });
    }
};

// Get a single tour package by ID
export const getTourPackageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tourPackage = await prisma.tourPackage.findUnique({
            where: { id: Number(id) },
            include: {
                tourCategory: true,
                reviews: {
                    orderBy: { createdAt : "desc" },
                },
            }
        });
        if (tourPackage) {
            res.status(200).json(tourPackage);
        } else {
            res.status(404).json({ error: "Tour package not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve tour package" });
    }
};

// Update a tour package by ID
export const updateTourPackageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            name,
            location,
            city,
            price,
            image,
            freeCancelationAvailable,
            tourCategoryId,
            startDate,
            endDate,
            accommodationDetails,
            activities,
            transportationDetails,
        } = req.body;
        const updatedTourPackage = await prisma.tourPackage.update({
            where: { id: Number(id) },
            data: {
                name,
                location,
                city,
                price,
                image,
                freeCancelationAvailable,
                tourCategoryId,
                startDate,
                endDate,
                accommodationDetails,
                activities,
                transportationDetails,
            },
        });
        res.status(200).json({
            message: "Tour package updated successfully",
            data: updatedTourPackage,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update tour package" });
    }
};

// Delete a tour package by ID
export const deleteTourPackageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.tourPackage.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({
            message: "Tour package deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete tour package" });
    }
};
