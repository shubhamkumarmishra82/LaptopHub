
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../api/productApi";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Demo products
  const products = useSelector((state)=>state.product.products)

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  useEffect(()=>{
     dispatch(getAllProducts())
     .catch((err)=>{
      console.log(err)
     })
  } , [dispatch])

  const handleDelete = (id) => {
   if(window.confirm("Are you sure to delete")){
    dispatch(deleteProduct(products.id))
   }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesBrand =
        brand === "All" || product.brand === brand;

      return matchesSearch && matchesBrand;
    });
  }, [products, search, brand]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ getValue }) => (
          <span className="product-name">{getValue()}</span>
        ),
      },
      {
        accessorKey: "brand",
        header: "Brand",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) =>
          `₹${getValue().toLocaleString("en-IN")}`,
      },
      {
        accessorKey: "stock",
        header: "Stock",
      },
    {
    id: "update",
    header: "Update",
    enableSorting: false,
    cell: ({ row }) => (
        <button
            className="product-action update-icon"
            title="Update Product"
            onClick={() =>
                navigate(
                    `/admin/dashboard/products/update/${row.original.id}`
                )
            }
        >
            ✏️
        </button>
    ),
},

      {
        id: "delete",
        header: "Delete",
        enableSorting: false,
        cell: ({ row }) => (
          <button
            className="product-action delete-icon"
            title="Delete Product"
            onClick={() => handleDelete(row.original.id)}
          >
            🗑️
          </button>
        ),
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="admin-products">
      <div className="products-heading">
        <div>
          <h2>Products</h2>
          <p>Manage all your laptop products</p>
        </div>

        <button
          className="add-product-btn"
          onClick={() =>
            navigate("/admin/dashboard/products/add")
          }
          title="Add New Product"
        >
          +
        </button>
      </div>

      {/* Search and Brand Filter */}
      <div className="products-filters">
        <input
          type="text"
          className="form-control product-search"
          placeholder="Search product name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            table.setPageIndex(0);
          }}
        />

        <select
          className="form-select brand-filter"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            table.setPageIndex(0);
          }}
        >
          <option value="All">All Brands</option>
          <option value="HP">HP</option>
          <option value="Dell">Dell</option>
          <option value="Lenovo">Lenovo</option>
          <option value="ASUS">ASUS</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="products-table-container">
        <div className="table-responsive">
          <table className="table products-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <button
                          className="table-sort-btn"
                          onClick={header.column.getToggleSortingHandler()}
                          disabled={!header.column.getCanSort()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? ""}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="no-products">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="products-pagination">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(table.getPageCount(), 1)}
          </span>

          <div className="pagination-buttons">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
